const express = require("express");
const app = express();
const hbs = require('hbs');

// Handlebars 
app.set('view engine', 'hbs');
app.set("views", __dirname +  "/views");
hbs.registerPartials(__dirname + "/views/partials");

//Routes
app.get("/",function(req, res) {
    res.render("index",);
});

app.get("/articles/add",function(req, res) { 
    res.render("add_article",);
});

app.listen("3000", function() {
    console.log("Connected on port 3000")
});


