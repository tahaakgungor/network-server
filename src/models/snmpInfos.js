const mongoose = require("mongoose");

const SnmpInfosSchema = new mongoose.Schema({
    host: {
        type: String,
        required: true,
    },
    community: {
        type: String,
        required: true,
    },
    oids: {
        type: Array,
        required: true,
    },
    value: {
        type: Array,
        required: true,

    }
});

module.exports = mongoose.model("SnmpInfos", SnmpInfosSchema);

