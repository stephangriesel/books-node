const express = require("express");
const app = express();
const hbs = require('hbs');

//Routes
app.get("/",function(req, res) {
    res.render("index",);
});

app.listen("3000", function() {
    console.log("Connected on port 3000")
});

// Handlebars 
app.set('view engine', 'hbs');
app.set("views", __dirname +  "/views");
hbs.registerPartials(__dirname + "/views/partials");
