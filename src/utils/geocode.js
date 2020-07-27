const request = require('request')

const geocode = (address, callback) => {
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoicG9vbWFoYWphbiIsImEiOiJja2N4OGM0bWgwNjUzMzdwN3c3aWxiNTZoIn0.nH03zFNTm53UEeP0uFKTsg&limit=1'

    request({url: geourl, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if (body.features.lenght === 0) {
            callback('Unable to find location, Try again', undefined)
        }else{
            callback( undefined, {
                lati: body.features[0].center[0],
                longi: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }  
    })
}

module.exports = geocode