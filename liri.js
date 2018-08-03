require("dotenv").config();



var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: '3DZhIm09NeVey8gQD0O9Ezk6M',
    consumer_secret: 'ToybO6iGDUvMKXNL5usU06FV607EN4imomzHxwkoZgPz04wnA6',
    access_token_key: '1024433301547835392-2d9PWkH6yWWCGK488GSRSPq3Kfl4C3',
    access_token_secret: 'YG2wYN2ZT8ZxcI4m2LnYvG1KW0B3zjbTKGiSHDkJKP9OC'
});
// DTB70513059

function myTweets() {
    var paramsT = { screen_name: 'DTB70513059', count: 20 };
    client.get('statuses/user_timeline', paramsT, function (error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        else {

            for (i = 0; i < 20; i++) {
                var myTweet = data[i];
                console.log(myTweet.text);
            }
        };

    });
};

var Spotify = require('node-spotify-api');
var params = process.argv.slice(2);

var spotify = new Spotify({
    id: "3e6e88e367cf4383be95b80ee52ec31f",
    secret: "ab2a3e3296a348e99d604974f363b519"
});

function spotifyIt() {

    spotify.search({ type: 'track', query: params[1] }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;  //from spotify npm docs
        }
        else {
            var songInfo = data.tracks.items[0];
            console.log("Artist: " + songInfo.artists[0].name)
            console.log("Title: " + songInfo.name)
            console.log("Preview Link: " + songInfo.preview_url)
            console.log("Album name: " + songInfo.album.name)

        };
    });
}

var request = require("request");
var paramsM = process.argv.slice(2);

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?t=" + paramsM[1] + "&y=&plot=short&apikey=trilogy";
    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Metascore + '%');
            console.log("Country Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};


var fs = require("fs");

function doIt() {

    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data1) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // We will then print the contents of data
        // console.log(data1);
        spotify.search({ type: 'track', query: data1 }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;  //from spotify npm docs
            }
            else {
                var songInfo = data.tracks.items[0];
                console.log("Artist: " + songInfo.artists[0].name)
                console.log("Title: " + songInfo.name)
                console.log("Preview Link: " + songInfo.preview_url)
                console.log("Album name: " + songInfo.album.name)

            };
        });

    });
};

switch (params[0]) {
    case "my-tweets":
        myTweets();
        break;
    case "do-what-it-says":
        doIt();
        break;
    case "movie-this":
        if (paramsM[1]) {
            movieThis();
        } else paramsM[1] = 'Mr. Nobody';
        movieThis();
        break;
    case "spotify-this-song":
        if (params[1]) {  //if a song is put named in 4th paramater go to function
            spotifyIt();
        } else params[1] = 'Ace of Base - The Sign'; {  //if blank call it Ace of Base "The Sign"
            spotifyIt();
        }
        break;
};

// node liri.js my-tweets
// node liri.js spotify-this-song '<song name here>'
// node liri.js movie-this '<movie name here>'