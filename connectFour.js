(function() {
    
//Model
    
    function newBoard() {
        return [
            [0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
            ];
    }

    function changePlayer(player) {
        return -player;
    }
    
    //finds the row that move 'drops' to
    function getEmptyRow(board, move) {
        var emptyRow;
        for (var i=0; i<6; i++) {
            if (board[i][move] == 0) {
                emptyRow = i;
            }
        }
        return emptyRow;
    }
    
    //mutates board array with given move
    function updateBoardArray(board, move, player) {
        board[getEmptyRow(board, move)][move] = player;
    }
    
    
    //checks top row is empty for move and game is not over
    function isValidMove(board, move) {
        return (
            board[0][move] == 0 && 
            !isWinner(board, 1) && 
            !isWinner(board, -1)
            );
    }
    
    function isWinner(board, player) {
        //check horizontal fours
        for (var i=0; i<6; i++) {
            for (var j=0; j<4; j++) {
                if (
                    player == board[i][j] &&
                    player == board[i][j+1] &&
                    player == board[i][j+2] &&
                    player == board[i][j+3]
                ) { 
                    return true;
                }
            }
        }
        //check vertical fours
        for (var i=0; i<3; i++) {
            for (var j=0; j<7; j++) {
                if (
                    player == board[i][j] &&
                    player == board[i+1][j] &&
                    player == board[i+2][j] &&
                    player == board[i+3][j]
                ) { 
                    return true;
                }
            }
        }
        //check positive gradient diagonal fours
        for (var i=0; i<3; i++) {
            for (var j=3; j<7; j++) {
                if (
                    player == board[i][j] &&
                    player == board[i+1][j-1] &&
                    player == board[i+2][j-2] &&
                    player == board[i+3][j-3]
                ) { 
                    return true;
                }
            }
        }
        //check negative gradient diagonal fours
        for (var i=0; i<3; i++) {
            for (var j=0; j<4; j++) {
                if (
                    player == board[i][j] &&
                    player == board[i+1][j+1] &&
                    player == board[i+2][j+2] &&
                    player == board[i+3][j+3]
                ) { 
                    return true;
                }
            }
        }
        return false;
    }
    
    function isFull(board) {
        for (var i=0; i<6; i++) {
            for (var j=0; j<7; j++) {
                if (board[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    }
    
    // Constructors for animation
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

    // Move constructor
    function Move(position, player) {
        this.position = position;
        console.log(getEmptyRow(board, 5));
        this.endPosition = getEmptyRow(board, position.x/100) * 100;
        this.player = player;
        this.speed = new Vector(0, 200);
    }

    Move.prototype.act = function(step) {
        var newPosition = this.position.plus(this.speed.times(step));
        if (newPosition.y >= this.endPosition) {
            this.speed.y = 0;
            this.position.y = this.endPosition;
        } else {
            this.position = newPosition;
        }
    }
        
    
//View
    
    //draws the board with no moves populating it
    function drawFrameView() {
        cxFrame.globalCompositeOperation = "xor";
        cxFrame.fillStyle = "Black";
        cxFrame.fillRect(0, 0, 700, 600);
        for (var i=0; i<700; i+=100) {
            for (var j=0; j<600; j+=100) {
                drawFilledCircle(cxFrame, {x: i, y: j}, 100, 45, "white")
            }
        }
    } 
    
    function clearMovesView() {
        cxMoves.clearRect(0, 0, 700, 600);
    }
    
    // Move Animation
    var lastTime = null;
    function frame(time) {
        if (lastTime != null) {
            updateMoveAnimation(Math.min(100, time - lastTime) / 1000);
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    function updateMoveAnimation(step) {
        //calls act on each move object, updating position
        moves.forEach(function(move) {
            move.act(step);
        });
        
        clearMovesView();
        
        //redraw all moves
        moves.forEach(function(move) {
            drawMove(move.position.x, move.position.y, move.player);
        });
    }
    
    function drawMove(positionX, positionY, player) {
        if (player == 1) {
            drawFilledCircle(cxMoves, {x: positionX, y: positionY}, 100, 35, "red")
        } else {
            drawFilledCircle(cxMoves, {x: positionX, y: positionY}, 100, 35, "yellow")
        }
    }
    
    function drawFilledCircle(context, position, size, radius, fillColour) {
        var x = position.x;
        var y = position.y;
        context.beginPath();
        context.arc(x + size/2, y + size/2, radius, 0, 7);
        context.fillStyle = fillColour;
        context.fill();
    }
    
    //header view 
    function getHeaderElt(move) {
        return document.getElementById(moveToId(move)); 
    }
    
    function drawArrow(context, position, width, height, fillColour) {
        var x = position.x;
        var y = position.y;
        context.beginPath();
        context.moveTo(x + width/4, y);
        context.lineTo(x + width*3/4, y);
        context.lineTo(x + width*3/4, y + height/2);
        context.lineTo(x + width, y + height/2);
        context.lineTo(x + width/2, y + height);
        context.lineTo(x, y + height/2);
        context.lineTo(x + width/4, y + height/2);
        context.closePath();
        context.fillStyle = fillColour;
        context.fill();
    }
    
    function clearHeader(context, size) {
        context.clearRect(0, 0, size, size);
    }
    
    //status text view
    function setStatusText(text) {
        document.getElementById("connect-four-game-status").innerText = text;
    }
    
    
//Controller
    
    function idToMove(id) {
        return parseInt(id[13]);
    }
    
    function moveToId(move) {
        return "connect-four-" + move;
    }
    
    function playMove(board, move, player) {
        console.log("move valid", move);
        //updateBoardView(board);
        moves.push(new Move(new Vector(move*100, 0), player));
        //animateMoveView(board, move, player); 
        updateBoardArray(board, move, player);
    }
    
    function setClickListener(move) {
        getHeaderElt(move).addEventListener("click", function() {
            console.log("click", move);
            if (isValidMove(board, move)) {
                playMove(board, move, player);
                if (isWinner(board, player)) {
                    if (player == 1) {
                        setStatusText("Red wins!");
                    } else {
                        setStatusText("Yellow wins!");
                    }
                } else if (isFull(board)) {
                    setStatusText("It is a draw.");
                } else {
                    player = changePlayer(player);
                    if (player == 1) {
                        setStatusText("Red to play.");
                    } else {
                        setStatusText("Yellow to play.");
                    }
                }
            }
        });
    }
    
    function setMouseoverListener(move) {
        getHeaderElt(move).addEventListener("mouseover", function() {
            console.log("mouseover", move);
            drawArrow(headerContexts[move], {x: 0, y: 0}, 100, 100, "blue")
        });
    }
    
    function setMouseoutListener(move) {
        getHeaderElt(move).addEventListener("mouseout", function() {
            console.log("mouseout", move);
            clearHeader(headerContexts[move], 100)
        });
    }
        
    document.getElementById("connect-four-new-game").addEventListener("click", newGame);
    
    function newGame() {
        clearMovesView();
        moves = [];
        board = newBoard();
        player = 1;
        setStatusText("Red to play.");
    }
    
    var cxMoves = document.getElementById("connect-four-moves").getContext("2d");
    var cxFrame = document.getElementById("connect-four-frame").getContext("2d");
    var headerContexts = [];
    //gets contexts for all of the headers and stores in array
    for (var i=0; i<7; i++) {
        headerContexts.push(document.getElementById(moveToId(i)).getContext("2d"));
    }
    
    //adds listeners to the headers
    for (var i=0; i<7; i++) {
        setClickListener(i);
        setMouseoverListener(i);
        setMouseoutListener(i)
    }
    
    var board;
    var player;
    var moves;
    drawFrameView();
    newGame();
})();
