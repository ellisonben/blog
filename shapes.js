(function() {
    function drawDiamond(context, position, size, colour) {
        var x = position.x;
        var y = position.y;
        context.beginPath();
        context.moveTo(x + size/2, y);
        context.lineTo(x, y + size/2);
        context.lineTo(x + size/2, y + size);
        context.lineTo(x + size, y + size/2);
        context.closePath();
        context.fillStyle = colour;
        context.fill()
    }

    function drawZigZag(context, position, width, height, numberOfZigs) {
        var x = position.x;
        var y = position.y;
        var dir = 1;
        var dist = height/numberOfZigs;
        context.beginPath();
        context.moveTo(x, y);
        for (var down = dist; down <= height; down += dist) {
            context.lineTo(x + width/2 + (width/2)*dir, y + down);
            dir = -dir;
        }
        context.stroke();
    }

    function drawSpiral(context, position, size, whirls, numberOfLines) {
        var x = position.x;
        var y = position.y;
        var angle = 0;
        var totalAngle = whirls * 2 * Math.PI;
        var scale = size / (2 * Math.sqrt(
                            Math.pow(totalAngle * Math.cos(totalAngle), 2) + 
                            Math.pow(totalAngle * Math.sin(totalAngle), 2)
                            ));
        context.beginPath();
        context.moveTo(x + size/2, y + size/2);
        for (var i = 0; i < numberOfLines; i++) {
            angle += totalAngle/numberOfLines
            context.lineTo(
                            x + size/2 + scale * angle * Math.cos(angle), 
                            y + size/2 + scale * angle * Math.sin(angle)
                            );
        }
        context.stroke();
    }

    function drawStar(context, position, size, numberOfPoints, colour) {
        var x = position.x;
        var y = position.y;
        var angle = 2 * Math.PI/numberOfPoints;
        var radius = size/2;
        var edgeX = x + size;
        var edgeY = y + size/2;
        context.beginPath();
        context.moveTo(edgeX, edgeY); //starts middle right
        for (var a = angle; a <= 2*Math.PI; a += angle) {
            edgeX = x + size/2 + radius * Math.cos(a);
            edgeY = y + size/2 + radius * Math.sin(a);
            context.quadraticCurveTo(x + size/2, y + size/2, edgeX, edgeY);
        }
        context.closePath();
        context.fillStyle = colour;
        context.fill();
    }

    var cx = document.getElementById("shapes").getContext("2d");
    //A red diamond 
    drawDiamond(cx, {x: 0, y: 0}, 150, "red");
    //A zigzagging line
    drawZigZag(cx, {x: 175, y: 0}, 100, 150, 11);
    //A yellow star
    drawStar(cx, {x: 300, y: 0}, 150, 8, "yellow");
    //A smoother spiral with more whirls
    drawSpiral(cx, {x: 450, y: 0}, 150, 6, 1000);

    var starCx = document.getElementById("stars").getContext("2d");
    //draw a number of stars with differing numbers of points
    drawStar(starCx, {x: 0, y: 0}, 100, 3, "yellow");
    drawStar(starCx, {x: 100, y: 0}, 100, 4, "yellow");
    drawStar(starCx, {x: 200, y: 0}, 100, 5, "yellow");
    drawStar(starCx, {x: 300, y: 0}, 100, 6, "yellow");
    drawStar(starCx, {x: 400, y: 0}, 100, 7, "yellow");
    drawStar(starCx, {x: 500, y: 0}, 100, 8, "yellow");

    var spiralsCx = document.getElementById("spirals").getContext("2d");
    //draw a number of variety of spirals
    drawSpiral(spiralsCx, {x: 5, y: 0}, 140, 3.25, 1000);
    drawSpiral(spiralsCx, {x: 155, y: 0}, 140, 6.2, 1000);
    drawSpiral(spiralsCx, {x: 305, y: 0}, 140, 9, 1000);
    drawSpiral(spiralsCx, {x: 455, y: 0}, 140, 5.9, 1000);
})();
