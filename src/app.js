const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'bamboozled'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'bamboozled'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        hlpMsg: 'You are about to get bamboozled',
        name: 'bamboozled'
    })
})

// Weather -----------------------------------------------------
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })

        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }


                res.send({
                    search_address: req.query.address,
                    location,
                    forecast: forecastData

                })




            })

        }

    })


})

// Products -----------------------------------------------------
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error page',
        errorMsg: 'Help article not found.',
        name: 'bamboozled'
    })

})


app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error page',
        errorMsg: 'Page not found.',
        name: 'bamboozled'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})