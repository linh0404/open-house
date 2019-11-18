const express = require('express');
const route = express.Router();
const cors = require('cors');
const Chat = require('../models/Chat');


route.user(cors())

route.post('/sent', (req, res) => {
    console.log("G'day");
    const today = new Date()
    const newMessage = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
        created: today
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