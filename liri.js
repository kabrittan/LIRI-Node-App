var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
const env = require("dotenv").config();
const keys = require('./keys.js');
const inquire = require('inquirer');
const moment = require('moment')
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const fs = require('fs');

var command = process.argv[2];
var spotifyID = "";
var spotifySecret = "";
var omdbKey = "trilogy";


var song;
var movie;
var command;
