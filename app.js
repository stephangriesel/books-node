const express = require("express");
// Init App
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


// Handlebars 
app.set('view engine', 'hbs');
app.set("views", __dirname +  "/views");
// Register partials
hbs.registerPartials(__dirname + "/views/partials");
// Public folder
app.use(express.static(path.join(__dirname, '/public')));


mongoose.connect("mongodb://localhost/newDB");
var db = mongoose.connection;

// Check DB connection
db.once('open', function(){
    console.log('Connected to MongoDB');
})

db.on('error', function(err){
    console.log(err);
})

// Model
var Article = require('./models/article');
// console.log(Article);

// Body Parser 
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Get article
// app.get("/article/:id", function(req,res) {
//     Article.findById(req.params.id, function(err, article){
//         console.log(article);
//         return;
//     })
// })

//Routes
app.get("/",function(req, res) {
    Article.find({}, function(err, articles){
        if(err) {
            console.log(err)
        } else {
            res.render("index", {
                title:'Articles',
                articles: articles // Confused by this, please explain
            });
        }
        
    });
        
});

// Add article page
app.get("/articles/add", function(req, res){
    res.render('add_article');
  });

// Load edit form
app.get("/article/edit/:id", function(req,res) {
    Article.findById(req.params.id, function(err, article){
        res.render('edit_article', {
            article:article
        });
    });
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