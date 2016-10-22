//Game Logic
function newBoard() {
    var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    return board;
}

function changePlayer(player) {
    return player*-1;
}

function getBoardCoord(board, move) {
    return board[move.x][move.y];
}

function setBoardCoord(board, move, value) {
    board[move.x][move.y] = value;
}

function checkValidity(board, move) {
    return getBoardCoord == 0;
}

function playMove(board, move, player) {

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
        for (var j=0; i<3; i++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

//View
function setDisplayValue(move, str) {
    var el = document.getElementById(move.x + "," + move.y).querySelector("div");
    el.innerText = str;
}

function newGame() {
    resetboard()
    var board = newBoard();
    var player = 1;    
}
