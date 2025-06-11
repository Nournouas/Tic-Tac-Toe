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

function createPlayer (name){
    let score = 0;
    let gameswon = 0;

    const getScore = () => score;
    const getGames = () => gameswon;
    const getName = () => name;

    const addToScore = () => score++;
    const addToGames = () => gameswon++;

    return {getName, getScore, getGames, addToScore, addToGames}
}

const player1 = createPlayer("Nour");
const player2 = createPlayer("Agata");

function createGameBoard () {
    const board = [
        {id: 1, status: "not"},
        {id: 2, status: "not"},
        {id: 3, status: "not"},
        {id: 4, status: "not"},
        {id: 5, status: "not"},
        {id: 6, status: "not"},
        {id: 7, status: "not"},
        {id: 8, status: "not"},
        {id: 9, status: "not"}
    ] 

    const getBoard = () => board;

    const updateBoard = (move) => {
        board.forEach(button => {
            if (button.id === move.id){
                button.status = "occupied"
            }
        })
    }

    return {getBoard, updateBoard}
}

const board = createGameBoard();
const check = board.getBoard()[0];
console.log(check);

board.updateBoard({
    id: 1
})

const check2 = board.getBoard()[0];
console.log(check2);
