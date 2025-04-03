const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    ShortUrl: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("Url", urlSchema)