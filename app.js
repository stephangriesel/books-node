const express = require("express");
const app = express();

//Routes
app.get("/",function(req, res) {
    res.send("Hello test");
});

app.listen("3000", function() {
    console.log("Connected on port 3000")
});