const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

//console.log(__dirname);
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

const app = express()

//Define path for Express config
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../partials')

//Setup handlebars engine
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

//app.get('', (req, res) => { res.send('<h1>Hello Page</h1>') })
app.get('', (req, res) => { 
    res.render('index', {
        //title: 'Handlbar dynamic value',
        title: 'Welcome!!',
        name: 'Pooja'
    }) 
})

//app.get('/help', (req, res) => { res.send('Help Page') })
app.get('/help', (req, res) => { 
    //res.render('help')
    res.render('help', {
        title: 'Help!!',
        para: 'This is help provided by dynamic render',
        name: 'Pooja'
    }) 
})

// app.get('/about', (req, res) => { 
//     res.send([{
//         name: 'Pooja',
//         age: 22
//     },
//     {
//         name: 'Pooja',
//         age: 22
//     }]) 
// })
app.get('/about', (req, res) => { 
    //res.render('about')
    res.render('about', {
        //title: 'About - dynamic render',
        title: 'About!!',
        name: 'Pooja'
    }) 
})

// app.get('/weather', (req, res) => { 
//     res.send({
//         title: 'Weather',
//         location: 'Indore',
//         forecast: 'Sunny Day',
//         name: 'Pooja'
//     }) 
// })

// app.get('/weather', (req, res) => { 
//     if(!req.query.address){
//         error: 'You must enter a location'
//     }
//     console.log(req.query.address)
//     res.send({
//         location: 'Indore',
//         forecast: 'Sunny Day',
//         address: req.query.address
//     }) 
// })
app.get('/weather', (req, res) => { 
    if(!req.query.address){
        error: 'You must enter a location'
    }

    geocode(req.query.address, (error, data) => {
        if(error) {
            return res.send({error})
        }
        res.send({
            data: data
//            location: 'Indore',
  //              forecast: 'Sunny Day',
    //             address: req.query.address
                  
        })
        
    })
    // console.log(req.query.address)
    // res.send({
    //     location: 'Indore',
    //     forecast: 'Sunny Day',
    //     address: req.query.address
    // }) 
})


app.get('/products', (req, res) => { 
    if(!req.query.search){
        return    res.send({
            error: 'You must provide a search item'
        }) 
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})



//app.get('/help/*' , (req, res) => { res.send('Help content not found')})
app.get('/help/*' , (req, res) => { 
    res.render('404', {
        title: '404',
        name: 'Pooa',
        errorMsg: 'Help Content Not Found'
    })
})

app.get('*' , (req, res) => { res.send('My 404 Page')})


app.listen(3000, () => console.log('Server is up'))

