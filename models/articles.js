var mongoose = require("mongoose");

// Schema
var articlesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

var Article = module.exports = mongoose.model('Article', articlesSchema);