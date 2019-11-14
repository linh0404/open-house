var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')
var Properties = require('./routes/Properties')

app.use('/users', Users)
app.use('/properties', Properties)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
