/* 
This application is still a work in progress

The idea is that it will eventually be able to provide reminders to users to 
get them to push their work to github and get encourage being a more active 
user of the resource. 
*/ 

var req = new XMLHttpRequest();

function printResponse() {
    console.log(JSON.parse(this.responseText));
}

function checkLastCommit() {
    var events = JSON.parse(this.responseText);
    var i = 0;
    while (events[i].type != "PushEvent" && i < events.length) {
        i++;
    }
    console.log(events[i].created_at);
    var commit_time = new Date(events[i].created_at);
    console.log(commit_time);
}

req.addEventListener("load", printResponse);
req.addEventListener("load", checkLastCommit);
req.open("GET", "https://api.github.com/users/ellisonben/events", true);
req.send()
