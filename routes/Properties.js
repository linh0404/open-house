const express = require('express');
const route = express.Router();
const cors = require('cors');
const Property = require('../models/Property');

route.use(cors())

route.post('/save', (req, res) => {
    const {landlord_name, landlord_contact, tenant_name, tenant_contact, address} = req.body;
    const propertyData = {
        landlord_name, landlord_contact, tenant_name, tenant_contact, address,
    }

    Property.create(propertyData)
        .then(property => {
            res.json({msg: "property saved"})
        })
        .catch(err => {
            console.log(err)
        })

})

// get properties 
route.get('/display', (req, res) => {
    
    if (req.query.role === "Tenant") {

        Property.findAll({ where: { tenant_contact: req.query.email } }).then(response => {
        res.json({data:response})
    })
}
    else {
        Property.findAll({ where: { landlord_contact: req.query.email } }).then(response => {
        res.json({data:response})
        
        })
    }
    
})


//get request from the front end. in that get request, send through the ID of the

module.exports = route