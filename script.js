/*const initBoard = (function () {
    const board = document.createElement("div");
    board.classList.add("board-div")
    
    
    for (let i = 0; i < 9; i++){
        const boardButton = document.createElement("div");
        boardButton.classList.add("board-button");
        board.appendChild(boardButton);
    }

    return board;

})();

const gameBoard = (function(){

})();
*/

//create player function with name
function createPlayer (name){
    let score = 0;
    let gameswon = 0;
    let playing;

    const getScore = () => score;
    const getGames = () => gameswon;
    const getName = () => name;
    const getPlayStatus = () => playing;

    const addToScore = () => score++;
    const addToGames = () => gameswon++;

    return {getName, getScore, getGames, addToScore, addToGames, getPlayStatus}
}

//create gameboard with player1 & player2
function createGameBoard (player1, player2) {

    const board = [
        {id: 1, player: ""},
        {id: 2, player: ""},
        {id: 3, player: ""},
        {id: 4, player: ""},
        {id: 5, player: ""},
        {id: 6, player: ""},
        {id: 7, player: ""},
        {id: 8, player: ""},
        {id: 9, player: ""}
    ] 

    const getBoard = () => board;

    const updateBoard = (move) => {
        board.forEach(button => {
            if (button.id === move.id){
                button.player = move.player
            }
        })
    }

    return {getBoard, updateBoard}
}

/*
function currentPlayer (player1, player2){
    const currentP = player1.getName();

    return function updateP (){
        if (currentP === player1.getName()){
            currentP = player2.getName();
        } else {
            currentP = player1.getName();
        }

        return currentP
    }
}*/


const play = ( function (){

    const player1 = createPlayer("Nour");
    const player2 = createPlayer("Agata");
    const board = createGameBoard(player1, player2)

    const updatePlayer = currentPlayer();
    
    
})();

const moveHandler = (function (player, move, board) {
    const player = player;
    const move = move;
    let board = board

})();