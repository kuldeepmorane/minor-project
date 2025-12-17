const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    file: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Note", noteSchema);