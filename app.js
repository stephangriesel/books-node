const express = require("express");
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
// console.log(Article);

// Handlebars 
app.set('view engine', 'hbs');
app.set("views", __dirname +  "/views");
hbs.registerPartials(__dirname + "/views/partials");

// Body Parser 
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Routes
app.get("/",function(req, res) {
    Article.find({}, function(err, articles){
        if(err) {
            console.log(err)
        } else {
            res.render("index", {
                title:'Articles',
                articles: articles
            });
        }
        
    });
        
});

// Add article page

app.get("/articles/add", function(req, res){
    res.render('add_article');
  });

// Submit route

app.post("/articles/add", function(req,res){
    var article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
})



app.listen("3000", function() {
    console.log("Connected on port 3000")
});