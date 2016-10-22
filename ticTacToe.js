(function() {
    //Model
    function newBoard() {
        return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }

    function changePlayer(player) {
        return -player;
    }

    function getBoardCoord(board, move) {
        return board[move.x][move.y];
    }

    function setBoardCoord(board, move, value) {
        board[move.x][move.y] = value;
    }

    function isValidMove(board, move) {
        return ( 
            getBoardCoord(board, move) == 0 && 
            !isWinner(board, 1) && 
            !isWinner(board, -1)
            );
    }

    function playMove(board, move, player) {
        setBoardCoord(board, move, player);
    }

    function isWinner(board, player) {
        for (var i=0; i<3; i++) {
            if (
                player == board[i][0] &&
                player == board[i][1] &&
                player == board[i][2]
            ) { 
                return true;
            }
            else if (
                player == board[0][i] &&
                player == board[1][i] &&
                player == board[2][i] 
            ) {
                return true;
            }
        }
        if (
            player == board[0][0] &&
            player == board[1][1] &&
            player == board[2][2] 
        ) {
            return true;
        }
        else if (
            player == board[0][2] &&
            player == board[1][1] &&
            player == board[2][0] 
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    function isFull(board) {
        for (var i=0; i<3; i++) {
            for (var j=0; j<3; j++) {
                if (board[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    }

    //View
    function getSquareElt(move) {
        return document.getElementById(moveToId(move));
    }
    
    function moveToElt(move) {
        return document.getElementById(moveToId(move)).querySelector("div");
    }
    
    function setDisplayValue(move, str) {
        var el = moveToElt(move);
        el.innerText = str;
    }

    function resetBoardView() {
        console.log("reset view");
        for (var i=0; i<3; i++) {
            for (var j=0; j<3; j++) {
                setDisplayValue({x: i, y: j}, "");
            }
        } 
        setStatusText("Crosses to play.");
    }
    
    function setStatusText(text) {
        document.getElementById("game-status").innerText = text;
    }

    //Controller
    function idToMove(id) {
        return {x: parseInt(id[0]), y: parseInt(id[2])};
    }
    
    function moveToId(move) {
        return move.x + "," + move.y;
    }

    function setListener(move) {
        console.log("listener added", move);
        element = moveToElt(move);
        console.log(element);
        getSquareElt(move).addEventListener("click", function() {
            console.log("click", move);
            if (isValidMove(board, move)) {
                playMove(board, move, player);
                if (player == 1) {
                    setDisplayValue(move, "X");
                } else {
                    setDisplayValue(move, "O");
                }
                if (isWinner(board, player)) {
                    if (player == 1) {
                        setStatusText("Crosses Win!");
                    } else {
                        setStatusText("Noughts Win!");
                    }
                } else if (isFull(board)) {
                    setStatusText("It is a draw.");
                } else {
                    player = changePlayer(player);
                    if (player == 1) {
                        setStatusText("Crosses to play.");
                    } else {
                        setStatusText("Noughts to play.");
                    }
                     
                }
            }
        });
    }
    
    function newGame() {
        resetBoardView();
        board = newBoard();
        player = 1;
    }
    
    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            setListener({x: i, y: j});
        }
    }
    
    document.getElementById("newGame").addEventListener("click", newGame);
    
    var board;
    var player;
    newGame();
})();
