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

module.exports = route