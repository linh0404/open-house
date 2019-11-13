var orm = require("../congif/orm.js");

var displayProperty = {
    selectAll: function(cb) {
        orm.selectAll("properties", function(res) {
            cb(res);
        });
    },
};

module.exports = displayProperty;