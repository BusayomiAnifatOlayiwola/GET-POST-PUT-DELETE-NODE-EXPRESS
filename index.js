const express = require('express')
const app = express()
//for layout-file
const expressLayouts = require('express-ejs-layouts')

//built in module
const fs = require('fs')

//middleware - layout file
app.use(expressLayouts)

//to read and grab data from form and put it to body
app.use(express.urlencoded({extended: false}));

// for views use .ejs files
app.set('view engine', 'ejs')

//ROUTES - home route
//localhost:8000
app.get('/', (req, res)=>{
    res.send("Hi everyone")
})


//ROUTES - dinosaurs route - for index view
//localhost:8000/dinosaurs
app.get('/dinosaurs', (req, res)=>{
    //fs.readFileSync - to readfile in dinosaurs.json
   let dinos = fs.readFileSync('./dinosaurs.json')
   //converting from json to javascript object
   dinos = JSON.parse(dinos)
        //rendering 'dinosaurs/index' and given { dinos: dinos}as data
    res.render('dinosaurs/index', { dinos: dinos})
})

//it show comes before index
//ROUTES - dinosaurs/new route - for newview
//localhost:8000/dinosaurs/new
app.get('/dinosaurs/new', (req, res)=>{
  res.render('dinosaurs/new')
})


//POST = NO VIEW
app.post('/dinosaurs', (req, res)=>{
//for the form
    console.log(req.body)
  })


//ROUTES - dinosaurs/show route - for show view
//localhost:8000/dinosaurs/show
app.get('/dinosaurs/:index', (req, res)=>{
    //fs.readFileSync - to readfile in dinosaurs.json
   let dinos = fs.readFileSync('./dinosaurs.json')
   //converting from json to javascript object
   dinos = JSON.parse(dinos)
   //to get a particular dino when asked for it
   const dino = dinos[req.params.index]
        //rendering 'dinosaurs/show' and given { dinos: dinos}as data
    res.render('dinosaurs/show', { dino })
})












//PORT
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})