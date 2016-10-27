/* 
This application is still a work in progress

The idea is that it will eventually be able to provide reminders to users to 
get them to push their work to GitHub and encourage them to be more active 
users of the resource. 
*/ 

var req = new XMLHttpRequest();

function printResponse() {
    console.log(JSON.parse(this.responseText));
}

function formatTime(num, sing, plur) {
    if (num == 1) {
        return ("1 " + sing);
    } else if (num > 0) {
        return (num + " " + plur);
    } else {
        return "";
    }
}

function toDaysHoursMins(ms) {
    var days = Math.floor(ms/86400000);
    var hours = Math.floor((ms%86400000)/3600000);
    var mins = Math.floor((ms%3600000)/60000);
    return (
        formatTime(days, "day", "days") + " " +
        formatTime(hours, "hour", "hours") + " " +
        formatTime(mins, "minute", "minutes")
        ).trim();
}

// TODO: needs to be reworked and cleaned up
function timeFromLastPush() {
    var currentTime = new Date();
    var events = JSON.parse(this.responseText);
    var i = 0;
    while (events[i].type != "PushEvent" && i < events.length) {
        i++;
    }
    console.log(events[i].created_at);
    var pushTime = new Date(events[i].created_at);
    console.log(pushTime);
    console.log ("It has been " + 
            toDaysHoursMins(currentTime - pushTime) +
            " since you last pushed to GitHub"
            );
}

// TODO: add some sort of reminder functionality - email? popups? SMS?

req.addEventListener("load", printResponse);
req.addEventListener("load", timeFromLastPush);

req.open("GET", "https://api.github.com/users/ellisonben/events", true);
req.send();


/* 
TODO: create abstraction of getting URL process
Potentially use this pattern: 

function getURL(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(req.responseText);
    else
      callback(null, new Error("Request failed: " +
                               req.statusText));
  });
  req.addEventListener("error", function() {
    callback(null, new Error("Network error"));
  });
  req.send(null);
}

TODO: add some error catching for bad requests
Need to be able to handle error in callback function if it arises

getURL("data/nonsense.txt", function(content, error) {
  if (error != null)
    console.log("Failed to fetch nonsense.txt: " + error);
  else
    console.log("nonsense.txt: " + content);
});
*/
