const request = require('request')


forecast = (latitude, longitude, callback) => {

    const url ='https://api.weatherbit.io/v2.0/current?&lat=' + latitude +'&lon=' + longitude + '&key=97680c2b10dc46708431014eff67c701&lang=en&units=m&include=minutely'

    request({ url, json:true}, (error, {body})=>{

        if (error) {
            callback("Unable to connect to forecast services.", undefined);
        } else if (body.error) {
            callback('Unable to get forecast for the location.', undefined)
        } else {
            callback(undefined,  'It looks like we will have ' + body.data[0].weather.description + '. And there is a ' + body.data[0].precip + '% chance of rain.' 
            )
        }
    })

}





module.exports = forecast