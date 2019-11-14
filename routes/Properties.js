const express = require('express');
const route = express.Router();
const cors = require('cors');
const Property = require('../models/Property');

route.use(cors())

route.post('/save', (req, res) => {
    console.log("Hello");
    const {landlord_name, landlord_contact, tenant_name, tenant_contact, address} = req.body;
    const propertyData = {
        landlord_name, landlord_contact, tenant_name, tenant_contact, address,
    }

    Property.create(propertyData)
        .then(property => {
            console.log(property);
            res.json({msg: "property saved"})
        })
        .catch(err => {
            console.log(err)
        })

})

// get properties 
route.get('/display', (req, res) => {
    
    console.log('*********', req.query)
    // console.log("Display works");
    // const portfolioData = {
    //     landlord_name: req.body.landlord_name, 
    //     landlord_contact: req.body.landlord_contact, 
    //     tenant_name: req.body.tenant_name, 
    //     tenant_contact: req.body.tenant_contact, 
    //     address: req.body.address,
    // }

    // // Property.findAll({where: {email: req.params.email}})
    if (req.query.role === "Tenant") {

        Property.findAll({ where: { tenant_contact: req.query.email } }).then(response => {
            console.log(response)
        res.json({data:response})
    })
}
    else {
        Property.findAll({ where: { landlord_contact: req.query.email } }).then(response => {
            console.log(response)
            res.json({data:response})
        
        })
    }
    
})


//get request from the front end. in that get request, send through the ID of the

module.exports = route