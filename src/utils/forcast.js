const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9c07f31f620ef385ae91926ec5f18de5&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const currentForcast = response.body.current
            callback(undefined, currentForcast.weather_descriptions[0] + ". It is currently " + currentForcast.temperature + " degress out. And the humidity is " + currentForcast.humidity + ".")
        }
    })
}

module.exports = forecast