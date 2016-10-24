(function() {
    var trail = [];
    var count = 0;
    var timer;

    // initiates trail
    function initTrail(event) { 
        console.log("initialised trail");
        for (var i=0; i<10; i++) {
            var trailDiv = document.createElement("div");
            trailDiv.className = "trail";
            trailDiv.style.left = (event.pageX - 4) + "px";
            trailDiv.style.top = (event.pageY - 4) + "px";
            document.body.appendChild(trailDiv);
            trail.push(trailDiv);
        }
    }

    // gets trail to follow where mouse is
    function follow(event) {
        trail[count%10].style.left = (event.pageX - 4) + "px";
        trail[count%10].style.top = (event.pageY - 4) + "px";
        count++;
    }

    // gets trail to catch up when mouse stops
    function catchUp(event) {
        var i = 0;
        clearInterval(timer);
        timer = setInterval(function() {
            if (i >= 10) {
                clearInterval(timer);
            }
            trail[count%10].style.left = (event.pageX - 4) + "px";
            trail[count%10].style.top = (event.pageY - 4) + "px";
            count++;
            i++
        }, 50);
    }

    function delTrail() {
        for (var i=0; i<10; i++) {
            document.body.removeChild(trail[i]);
        }
        console.log("children removed");
        trail = [];
        console.log(trail);
    }

    function endTrail(event) {
        console.log("endTrail activated");
        removeEventListener("mousemove", follow);
        removeEventListener("mousemove", catchUp);
        clearInterval(timer);
        delTrail()
        document.getElementById("toggleMouseTrail").addEventListener("click", createTrail);
        document.getElementById("toggleMouseTrail").value="Back to the 90s";
        document.getElementById("toggleMouseTrail").removeEventListener("click", endTrail);
    }

    function createTrail(event) {
        initTrail(event)
        addEventListener("mousemove", follow);
        addEventListener("mousemove", catchUp);
        document.getElementById("toggleMouseTrail").addEventListener("click", endTrail);
        document.getElementById("toggleMouseTrail").value="Make it stop!";
        document.getElementById("toggleMouseTrail").removeEventListener("click", createTrail);
    }

    document.getElementById("toggleMouseTrail").addEventListener("click", createTrail);
})();
