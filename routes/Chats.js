const express = require('express');
const route = express.Router();
const cors = require('cors');
const Chat = require('../models/Chat');


route.use(cors())

route.post('/message', (req, res) => {
    console.log("G'day");
    console.log(req.body);
    const today = new Date().getTime();
    const newMessage = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
        created: today
        //how to get the loggedin email here
    }

    console.log({ newMessage })

    Chat.create(newMessage)
        .then(chat => {
            console.log(chat);
            res.json({msg: "chat saved"})
        })
        .catch(err => {
            console.log(err)
        })
})

route.get('/history', (req, res) => {

    console.log('*******', req.query)
    if (req.query.email === req.body.sender) {
        Chat.findAll({ where: { sender: req.query.email }}).then(response => {
            console.log(response)
        res.json({data:response})
        })
    }
    else {
        Chat.findAll({ where: { receiver: req.query.email}}).then(response => {
            console.log(response)
        res.json({data:response})
        })       
    }
})

module.exports = route