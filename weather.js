const yargs = require('yargs');
const fetch = require('node-fetch');

const userInput = yargs
    .options({
        n: {
            alias: `name`,
            string: true
        }
    }).argv;

const location = encodeURIComponent(userInput.name);
console.log(location);

const googleGeoCode = 'AIzaSyADAS--PnnHrOlE6Bn9_eZVK82IwjvPqek'

const darkSkyKey = '41731102f2964da7d6e0b37c2c524904'


fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleGeoCode}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        let lng = parseInt(data.results[0].geometry.location.lng)
        let lat = parseInt(data.results[0].geometry.location.lat)
        console.log("data", lng, lat)
        fetch(`https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`)
            .then(response => {
                if (response.status === 400) {
                    console.log(response)
                    return response
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                //console.log("data", JSON.stringify(data, null, 2))
                // console.log(data.currently.temperature)
                // console.log(data.daily.data[0].summary)
                // console.log(data.daily.data[0].temperatureHigh)
                // console.log(data.daily.data[0].temperatureLow)
                console.log((data.currently.temperature - 32) / 1.8 )
            })

    })
