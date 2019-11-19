var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')
var Properties = require('./routes/Properties')
var Reminders = require('./routes/Reminders')
var Chats = require('./routes/Chats')

app.use('/users', Users)
app.use('/properties', Properties)
app.use('/reminders', Reminders)
app.use('/chat', Chats)

if (process.env.NODE_ENV === "production") {
  app.use(express.static('./client/build'));
  app.get("/", function(req, res) {
    res.sendFile('./client/build/index.html');
  })
}


app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
