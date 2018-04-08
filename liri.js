require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var myLiri = "";
var liriRespond = "";
var song;
var movie;
var command;

if (process.argv[2] === "do-what-it-says") {
    console.log(process.argv[2]);
    fs.readFile("./random.txt", "utf8", function (err, data){
        if (err) throw err;
        var array = data.split(",");

        myLiri = array[0];
        liriRespond = array[1];
        console.log(myLiri);
        console.log(liriRespond);
        fs.appendFile("./log.txt", process.argv[2] + " led to: ", "utf8", function(err, data) {
            if (err) {
                console.log(err);
            }
        });
        liriAction(myLiri, liriRespond);
    });
} else {
    myLiri = process.argv[2];
}