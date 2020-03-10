const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// adiciona a controller/index e ela é responsavel por adicionar todas as demais 
// controllers (automaticamente) da pasta controllers
require('./app/controllers/index')(app)

app.listen(3000)