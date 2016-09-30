function newBoard () {
    var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    return board;
}

function changePlayer (player) {
    return player*-1;
}

function checkValidity (move, board) {

}

function playMove (move, board, player) {

}

function isWinner (player, board) {
    for (var i=0; i<3; i++) {
        if (board[i][0] == board[i][1] == board[i][2] == player) { 
            return true;
        }
        else if (board[0][i] == board[1][i] == board[2][i] == player) {
            return true;
        }
    }
    if (board[0][0] == board[1][1] == board[2][2] == player) {
        return true;
    }
    else if (board[0][2] == board[1][1] == board[2][0] == player) {
        return true;
    }
    else {
        return false;
    }
}

function isFull (board) {
    for (var i=0; i<3; i++) {
        for (var j=0; i<3; i++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function playGame () {
    var board = newBoard();
    var player = 1;
    
}
