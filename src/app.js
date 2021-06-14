const path = require ('path')

const express = require('express')

const hbs = require('hbs')

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

// console.log(__dirname);

// console.log(path.join(__dirname, '../public'));

// Important note: Express library exposes just one single function. So express is actually a function as supposed to something like an object. and we call it to create a new application. 

// Then we create a new variable to store our express application and all we do to generate our application is call express.

const app = express()

const port = proces.env.PORT || 3000


// Define paths for express config

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

//app.set helps us to tell express which templating engine we have installed.

// Set up handlebars engine and views location

app.set('view engine', 'hbs')

app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Rakesh Shetty'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title:'about',
        name: 'Rakesh Shetty'
    })
})


app.get('/help', (req, res)=> {
    res.render('help', {
        contactNumber: '34343434',
        title:'help',
        name: 'Rakesh Shetty'
    })
} )



// static method takes the path we wanna serve up.
//app.com
//app.com/help
//app.com/about

// so how do we setup our server to send a response when someone tries to get something at a specific route

//we set that up using a 'get' method() on 'app' The get method helps us configure what the server should do when someone tries to get resources( can be 'Html' or 'JSON') at a specific URL. 

//app.get takes in two arguments, first is the route and the second is a function

// app.get('', (req, res) => {
//    res.send('Hello Express')
// })


// app.get('/help', (req, res) => {
//    res.send('Help Centers')
// })


// app.get('/about', (req, res) => {
//     res.send({
//         companyName: 'WEBLAB ASIA',
//         OwnerName: 'Rakesh Shetty'
//     })
// } )


app.get('/weather', (req, res) => {

    if (!req.query.address) {

        
        return res.send({
            error:'You must provide an address to search.'
        })
    }

    geocode (req.query.address, (error, {latitude, longitude, location}={})=> {

        if (error) {
            return res.send({
                error
            });
        }
    
    
        forecast(latitude, longitude, (error, forecastData) => {
    
         if (error) {
            return res.send({
                error
            });
         }   
         res.send({
            forecast: forecastData,
            location,
            address: req.query.address
            })
          })
   
})

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term.'
        }) 
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

//the function argument is where we describe what we wanna do when somebody visits a particular route. So in this case the function will describe what to send back to them. 

// The function gets called will two very important arguments. The first argument is an object containing information about the incoming request to the server, commonly called 'req'



// the other argument is an object called 'res' which consists of a bunch of methods allowing us to customize what we gonna send back to the requester.

// res.send() allows us to send something back to the requester.

// The last thing that we need to do is start the server up. 

// To start the server we have to use one more method on the app. This method we'll only use a single time in out application. it is app.listen(). It starts up the server and have it listen on a specific port. for the project we'll use a common development port, port 3000. It is not the default port for e.g. for a http-based website the default port is 80. The other optional method that we can pass to the listen () is the callback function which just runs when the server is up and running. we'll console.log() in the body of the callback just to the let us know that the server started correctly.


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rakesh Shetty',
        errorMessage:'Help article not found.'
    })
})


app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Rakesh Shetty',
        errorMessage: 'Page not found.'
    })
})




app.listen(port, () => {
    console.log('Server is up on port: ' + port);
})



