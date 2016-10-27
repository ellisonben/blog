(function() {
    var hilary = document.querySelector("#hilary");
    var trump = document.querySelector("#trump");

    var angle = 0, antiAngle = 0, lastTime = null;

    function animate(time) {
        if (lastTime != null) {
            angle += (time - lastTime) * 0.001;
        }
        lastTime = time;
        
        hilary.style.top = (Math.sin(angle) * 70 + 100) + "px";
        hilary.style.left = (Math.cos(angle) * 200 + 250) + "px";
        
        trump.style.top = (Math.sin(angle) * -70) + 100 + "px";
        trump.style.left = (Math.cos(angle) * -200) + 250 + "px";
        
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();
