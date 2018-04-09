//Set up required packages and variables
require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//Special variables
var myLiri = "";
var liriRespond = "";
var song;
var movie;
var command;
 
//"do-what-it-says"
if (process.argv[2] === "do-what-it-says") {
    console.log(process.argv[2]);
    fs.readFile("./random.txt", "utf8", function (err, data){
        if (err) throw err;
        var array = data.split(",");

        myLiri = array[0];
        liriRespond = array[1];
        console.log(myLiri);
        console.log(liriRespond);
        //Writing to the log.txt file
        fs.appendFile("./log.txt", process.argv[2] + ": ", "utf8", function(err, data) {
            if (err) {
                console.log(err);
            }
        });
        liriAction(myLiri, liriRespond);
    });
} else {
    myLiri = process.argv[2];
    liriRespond = process.argv.slice(3).join(" ");
    liriAction(myLiri, liriRespond);
}
//Meat and potatoes of this app
function liriAction(myLiri, liriRespond) {
    fs.appendFile("./log.txt", myLiri + "," + liriRespond + "\n", "utf8", function(err, data) {
        if (err) {
            console.log(err);
        }
    });

    if (myLiri === "spotify-this-song") {
        if (liriRespond === "") {
            liriRespond = "women";
        }
        spotify.search({ type: "track", query: liriRespond, limit: 1 }, function (err, data) {
            if (err) {
                return console.log("Try something else, because " + err);
            } else {
                console.log("Artist(s): " + JSON.stringify(data.tracks.items[0].artists[0].name));
                console.log("Song: " + JSON.stringify(data.tracks.items[0].name));
                console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url));
                console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
                return;
            }
        });
    }

    else if (myLiri === "my-tweets") {
        var myTweets = { screen_name: "coderkyle64" };
        client.get("statuses/user_timeline", myTweets, function (error, tweets, response) {
            if (!error) {
                for (i = 0; i < tweets.length; i++) {
                    console.log("\n\tTweet # " + (i + 1) + ": " + tweets[i].text);
                }
            }
        });
    }
    else if (myLiri === "movie-this") {
        if (liriRespond === "") {
            liriRespond = "Mr Nobody";
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + liriRespond + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200){
                movie = JSON.parse(body);
                console.log("Title: " + movie.Title);
                console.log("Year: " + movie.Year);
                console.log("IMDB Rating: " + movie.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
                console.log("Country: " + movie.Country);
                console.log("Language: " + movie.Language);
                console.log("Plot: " + movie.Plot);
                console.log("Actors: " + movie.Actors);
            }
        });
    } else {
        if (myLiri !== "do-what-it-says" || "spotify-this-song" || "my-tweets" || "movie-this") {
        console.log("The only valid commands for this application are as follows:");
        console.log("\tdo-what-it-says" + " - to add any command to the random text file.");
        console.log("\tspotify-this-song" + " - to retrieve information on your favorite songs!");
        console.log("\tmy-tweets" + " - to find out what is on Kyle\'s mind!");
        console.log("\tmovie-this" + " - to retrieve information on your favorite movies!");
        console.log("\tHope you enjoy this little app of mine!!");
        }
    }
}
