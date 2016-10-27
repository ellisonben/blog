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

req.addEventListener("load", printResponse);
req.open("GET", "https://api.github.com/users/ellisonben/events", true);
req.send()
