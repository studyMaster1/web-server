const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')


const app = express()
const port = process.env.PORT || 3000

//Define path
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'eliad levi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'help',
        help: 'Help me you fucker!',
        name: 'eliad levi'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address)
    {
        return res.send({
            error: 'please enter address'
        })
    }

    getForcastByAddress(address, (error, {forcastData, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        
        res.send({
            forcast: forcastData,
            location,
            address
        })
    })
})

const getForcastByAddress = (address, callback) =>
{
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
            return callback(error, undefined)
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if(error)
            {
                return callback(error, undefined)
            }
            console.log({forcastData})
            return callback(undefined, {forcastData, location})
        })
    })
}

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'eliad levi'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'help',
        errroMessage: 'Help artical not found',
        name: 'eliad levi'
    })
})

app.get('*', (req,res) =>{
    res.render('404', {
        title:'404',
        errroMessage: '404 page not found',
        name: 'eliad levi'
    })
})

app.listen(port, () =>{
    console.log('Server is up')
})
