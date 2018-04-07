var env = require("dotenv").config();
var keys = require('./keys.js');
var inquirer = require('inquirer');
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdbKey = "trilogy";

var song;
var movie;
var command;

function postTweet() {

    var twittParams = { screen_name: "coderkyle64" };
    client.get('statuses/user_timeline', twittParams, function(error, tweets, response) {
         if (!error) {
            for (let i = 0; i < 20; i++) {
                console.log('Tweet # ' + i + "\n\n\t"+ tweets[i].text  +"\n Time: \t"+ tweets[i].created_at+ "\n\n\n"); 

                fs.appendFile("log.txt",  moment() + '\n\n\t\tTweet# :' + i + "'" + tweets[i].text + "   "  , function(err) {
                    // If the code experiences any errors it will log the error to the console.
                    if (err) {
                        return console.log(err)
                    }
                    // Otherwise, it will print: "log.txt was updated!"
                    console.log("log.txt was updated!");
                });
            }
        } else { 
             console.log(error); 
        }
    });
}

postTweet();
