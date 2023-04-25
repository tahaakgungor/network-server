const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    devices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device",
        },
    ],
});

module.exports = mongoose.model("Role", RoleSchema);