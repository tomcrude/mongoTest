const mongoose = require("mongoose")

const modelUser = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true 
    },
    verification: {
        type: Boolean,
        required: true 
    }
})

module.exports = mongoose.model("User", modelUser)