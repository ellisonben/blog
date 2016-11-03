(function() {
    var canvas = document.querySelector("#bouncingBall"); 
    var cx = canvas.getContext("2d");
    var initialX = Math.floor(Math.random() * canvas.width + 1);
    var initialY = Math.floor(Math.random() * canvas.height + 1);
    var ball = new Ball(new Vector(initialX, initialY));
    var radius = 6;
    
    // Vector constructor
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }

    Vector.prototype.plus = function(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    };

    Vector.prototype.times = function(factor) {
        return new Vector(this.x * factor, this.y * factor);
    };

    // Ball constructor
    function Ball(position) {
        this.position = position;
        // could randomise this?
        this.speed = new Vector(75, 125);
    }

    Ball.prototype.act = function(step) {
        var newPosition = this.position.plus(this.speed.times(step));
        if (newPosition.x > canvas.width || newPosition.x < 0) {
            this.speed.x *= -1;
        } else if (newPosition.y > canvas.height || newPosition.y < 0) {
            this.speed.y *= -1; 
        } else {
            this.position = newPosition;
        }
    }

    // Draw functions
    function drawBall(centreX, centreY) {
        cx.beginPath();
        // arc(centreX centreY radius startAngle endAngle)
        cx.arc(centreX, centreY, radius, 0, 7);
        cx.fill();
    }

    function clearCanvas() {
        cx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawBox() {
        cx.strokeRect(0, 0, canvas.width, canvas.height);
    }


    // Animation
    var lastTime = null;
    function frame(time) {
        if (lastTime != null) {
            updateAnimation(Math.min(100, time - lastTime) / 1000);
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    function updateAnimation(step) {
        ball.act(step);
        clearCanvas();
        drawBox();
        drawBall(ball.position.x, ball.position.y);
    }
})();
