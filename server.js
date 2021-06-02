const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
// require("dotenv/config");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://user-bose:user-bose@fyp.b0cb9.mongodb.net/personlistDB?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

var personSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    date: Date
});

var Person = mongoose.model("Person", personSchema);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server ON");
});

app.get("/", function (req, res) {
    res.render(__dirname + "/views/partials/home.ejs");
});

app.get("/register", function (req, res) {
    res.render(__dirname + "/views/register.ejs");
});

app.get("/newlyregister", function (req, res) {
    res.render(__dirname + "/views/newlyregister.ejs");
});

app.post("/newlyregister", function (req, res) {
    var fn = req.body.fname;
    var ln = req.body.lname;
    var d = req.body.date;
    var personData = new Person(req.body);
    personData.save()
        .then(reply => {
            res.send("<h1>Dear " + "'" + fn + " " + ln + "'" + "," + "<br>You have successfully registered for this " + "'" + d + "'" + " date. </h1>");
        });
});

app.get("/alreadyregistered", function (req, res) {
    res.render(__dirname + "/views/alreadyregistered.ejs");
});

app.post("/alreadyregistered", function (req, res) {
    var fn = req.body.fname;
    var ln = req.body.lname;
    var d = req.body.date;
    res.send("<h1>Dear " + "'" + fn + " " + ln + "'" + "," + "<br>Yes! You have already registered!</h1>");
});

app.get("/about", function (req, res) {
    res.render(__dirname + "/views/about");
});