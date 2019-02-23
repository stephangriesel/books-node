const express = require("express");
const hbs = require('hbs');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/newDB");
var db = mongoose.connection;

// Check DB connection
db.once('open', function(){
    console.log('Connected to MongoDB');
})

db.on('error', function(err){
    console.log(err);
})

// Init App
const app = express();

// Model
var Article = require('./models/article');
console.log(Article);

// Handlebars 
app.set('view engine', 'hbs');
app.set("views", __dirname +  "/views");
hbs.registerPartials(__dirname + "/views/partials");

//Routes
app.get("/",function(req, res) {
    Article.find({}, function(err, articles){
        res.render("index", {
            title:'Articles',
            articles: articles
        });
    });
        
});

// app.get("/articles/add",function(req, res) { 
//     res.render("add_article",);
// });

app.listen("3000", function() {
    console.log("Connected on port 3000")
});