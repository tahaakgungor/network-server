const mongoose = require("mongoose");

const SnmpSchema = new mongoose.Schema({
    host: {
        type: String,
        required: true,
    },
    community: {
        type: String,
        required: true,
    },
    oid: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("Snmp", SnmpSchema);

