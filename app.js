const express = require("express");
const app = express();
const hbs = require('hbs');

// Handlebars 
app.set('view engine', 'hbs');
app.set("views", __dirname +  "/views");
hbs.registerPartials(__dirname + "/views/partials");

//Routes
app.get("/",function(req, res) {
    var articles = [
        {
            id:1,
            title: "Nommer 1",
            author: "Stephan Griesel",
            body: "Description of article 1"
        },
        {
            id:2,
            title: "Nommer 2",
            author: "Stephan Griesel",
            body: "Description of article 2"
        },
        {
            id:3,
            title: "Nommer 3",
            author: "Stephan Griesel",
            body: "Description of article 3"
        },
    ]
    res.render("index", {
        title: 'Articles',
        articles: articles
    });
});

// app.get("/articles/add",function(req, res) { 
//     res.render("add_article",);
// });

app.listen("3000", function() {
    console.log("Connected on port 3000")
});


