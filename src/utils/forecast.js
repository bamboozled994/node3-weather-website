// request({ url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location!')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + '. Currently is ' + response.body.current.temperature + ' degrees. And subjective feel is ' + response.body.current.feelslike + ' degrees.')
//     }


const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=60fa4fd6ef480932185d44c7141eccf2&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. Currently is ' + body.current.temperature + ' degrees. And subjective feel is ' + body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast