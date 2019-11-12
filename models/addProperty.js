var orm = require ("../config/orm.js");
var currentTime = new Date().toISOString().slice(0,19).replace('T',' ');

var addProperty = {
    
    create: function(data) {
        var portfolio = {
            landlord: "",
            landlordContact: "",
            tenant: "",
            tenantContact: "",
            address: "",
            ...data,
        };

        var cols = [
            "landlord",
            "landlordContact",
            "tenant",
            "tenantContact",
            "address",
        ]

        var vals = [
            data.landlord,
            data.landlordContact,
            data.tenant,
            data.tenantContact,
            data.address,
        ];

        return new Promise(function(resolve, reject) {
            orm.insertOne("eventDetails", cols, vals, function(res) {
                resolve(res);
            });
        })
    }
};

module.exports = addProperty;