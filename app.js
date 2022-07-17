const express = require("express")
const bodyParser = require("body-parser");
const { request } = require("express");

const app = express()
var items = ["Buy Food", "Cook Food", "Eat with Joy"];
let workItems = [];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res){
    
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTitle: day, newItem: items});
});

app.post("/", function(req, res){

    var item = req.body.newItem;
    
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work"); 
    }
    else {
        items.push(item);
        res.redirect("/");
    }
})

app.listen(8000, function(){
    console.log("server started on port 8000")
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newItem: workItems})
})

app.post("/work", function(req, res){
    let item = request.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about", function(req, res){
    res.render("about");
})