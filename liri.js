var env = require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdbKey = "trilogy";

var song;
var movie;
var command;

function postTweet() {

    var tweetem = { screen_name: "coderkyle64" };
    client.get("statuses/user_timeline", tweetem, function(error, tweets, response) {
         if (!error) {
            for (let i = 1; i < 20; i++) {
                console.log("Tweet # " + i + "\t" + tweets[i].text + "\n Time: \t" + tweets[i].created_at + "\n\n"); 

                fs.appendFile("log.txt",  moment() + "\n\n\t\tTweet# :" + i + "'" + tweets[i].text + "   "  , function(err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log("Text file was updated!");
                });
            }
        } else { 
             console.log(error);
        }
    });
}

postTweet();
