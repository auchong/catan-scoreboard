'use strict'

var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var url = process.env.DATABASEURL || "mongodb://localhost/catan";
//mongoose.connect('mongodb://localhost/catan');
mongoose.connect(url);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//player db schema
var playerSchema = new mongoose.Schema({
    name: String,
    image: String,
    wins: Number,
    color: String,
    lastWin: Date
});

var Player = mongoose.model('Player', playerSchema);


app.get("/", function(req, res){
    Player.find({}, null, {sort: '-wins'}, function(err, players){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {players: players})
        }
    })
});

app.get("/player/new", function(req, res){
    res.render("new")
});


app.post("/player", function(req, res){
    req.body.player.wins = 0;

    Player.create(req.body.player, function(err, newPlayer){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
});

app.put("/player/update", function(req, res){
    Player.findByIdAndUpdate(req.body.id, {$inc: {wins: 1}, $currentDate: {lastWin: true}}, function(err, updatedPlayer){
        if(err){
            console.log(err);
        } else {
            console.log(updatedPlayer);
        }
    })
});

var port = process.env.PORT || 8080;
app.listen(port, process.env.IP, function(){
    console.log('Server started');
});
