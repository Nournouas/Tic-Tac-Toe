//create player function with name
function createPlayer (name){
    let score = 0;
    let gameswon = 0;
    let playing;
    let shape;

    const getScore = () => score;
    const getGames = () => gameswon;
    const getName = () => name;
    const getPlayStatus = () => playing;
    const getShape = () => shape;

    const addToScore = () => score++;
    const addToGames = () => gameswon++;
    const setPlayStatus = (status) => playing = status;
    const setShape = (shapeNew) => shape = shapeNew

    return {getName, getScore, getGames, addToScore, addToGames, getPlayStatus, setPlayStatus, getShape, setShape}
}

//create gameboard with player1 & player2
function createGameBoard () {
    let victoryFlag = false;
    let fullyOccupied = 0;
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

    const pattern = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]

    const getBoard = () => board;
    const getPattern = () => pattern;
    const getFlag = () => victoryFlag;
    const getFully = () => fullyOccupied;

    const updateBoard = (move) => {
        board.forEach(button => {
            if (button.id === move.id){
                if (button.player === ""){
                    button.player = move.player.getName();
                    fullyOccupied++;
                }else if (button.player != ""){
                    console.log("already occupied");
                }
                
            }
        })
    }

    const setVictory = () => victoryFlag = true;

    return {getBoard, updateBoard, getPattern, setVictory, getFlag, getFully}
}

function moveHandler (player, board, moveInput){ 
    let move = {id: moveInput, player: player}
    board.updateBoard(move)
    let playerMoveObjects = board.getBoard().filter((position) => position.player === player.getName())
    let playerMoves = playerMoveObjects.map((moveObj) => moveObj.id);
    if (moveValidator(playerMoves, board)){
        return "win";
    }
    if (board.getFully() === 9){
        return "draw";
    }
    

};

function moveValidator (playerMoves, board) {
            
            board.getPattern().forEach((pattern) =>{
            let check = 0;
            let i = 0;
            
            while (i < 3){
                if(playerMoves.includes(pattern[i])){
                    check++
                }
                i++;
            }

            if (check === 3){
                board.setVictory();
            }
        });
    return board.getFlag();
    };


//module for handling the game
const gameHandler = ( function (){

    
    
    const runGame = (player1, player2) => {
        let board;
        console.log(board)
        document.querySelector(".hide-board").style.display = "block";
        document.querySelector(".start-game-div").style.display = "none";
        const currentPlayerText = document.querySelector(".current-player");
        boardGraphics.UI();
        let boardSquares = document.querySelectorAll(".board-button")
        board = createGameBoard();

        function userMove (event){
            let boardSquare = event.target;
            let currentPlayer = decidePlayer.decide(player1, player2);
            boardSquare.textContent = currentPlayer.getShape();
            boardSquare.classList.add(currentPlayer.getShape());
            let UserInput = Number(boardSquare.id);
            currentPlayerText.textContent = "current player is " + currentPlayer.getName() + ".";
            
            if(moveHandler(currentPlayer, board, UserInput) === "win"){
                boardSquare.textContent = currentPlayer.getShape();
                boardSquare.classList.add(currentPlayer.getShape());
                currentPlayerText.textContent = "The winner is: " + currentPlayer.getName() + ".";
                boardSquares.forEach((b) => {
                    b.removeEventListener("click", userMove)
                    b.style.cursor = "not-allowed";
                });
                const resetb = document.createElement("button");
                resetb.textContent = "reset";
                document.querySelector(".hide-board").appendChild(resetb);
                resetb.addEventListener("click", handleReset.reset);

            }
            
            else if (moveHandler(currentPlayer, board, UserInput) === "draw"){
                boardSquare.textContent = currentPlayer.getShape();
                boardSquare.classList.add(currentPlayer.getShape());
                currentPlayerText.textContent = "Its a draw!";
                boardSquares.forEach((b) => {
                    b.removeEventListener("click", userMove)
                    b.style.cursor = "not-allowed";
                })
                const resetb = document.createElement("button");
                resetb.textContent = "reset";
                document.querySelector(".hide-board").appendChild(resetb);
                resetb.addEventListener("click", handleReset.reset);
            }
        }

        boardSquares.forEach((boardSquare) => {
            boardSquare.addEventListener("click", userMove)
        })


    }

    return {runGame}

})();

const boardGraphics = (function(){

    function UI(){
        let boardDivParent = document.querySelector(".hide-board");
        let boardDiv = document.querySelector(".board-div");
        boardDivParent.removeChild(boardDiv);

        boardDiv = document.createElement("div");
        boardDiv.classList.add("board-div");

        for (let i = 1; i<10 ; i++){
            let boardDivButton = document.createElement("div");
            boardDivButton.classList.add("board-button");
            boardDivButton.setAttribute("id", i.toString())
            boardDiv.appendChild(boardDivButton);
        }

        boardDivParent.appendChild(boardDiv);

        return boardDiv

    }

    return {UI}
})();




const decidePlayer = (function(){
    let currentPlayer = "";
        function decide(player1, player2) {
            //player 1 switch to 2
            if (player1.getPlayStatus() === true){
                currentPlayer = player1;
                player1.setPlayStatus(false);
                player2.setPlayStatus(true);
            }

            //player 2 switch to 1
            else if (player2.getPlayStatus() === true){
                currentPlayer = player2;
                player2.setPlayStatus(false);
                player1.setPlayStatus(true);
            }
            return currentPlayer
        }
     



    return {decide}
})();

const handleReset = (function (){

    function reset () {
        let boardDiv = document.querySelector(".board-div");
        boardDiv.remove();
        console.log(boardDiv);

        document.querySelector("#first-player-field").value = "";
        document.querySelector("#second-player-field").value = "";

        let form = document.querySelector(".player-form");
        form.removeChild(document.querySelector(".start-button"));
        document.querySelector(".current-player").textContent = "";
        const startBtn = document.createElement("input");
        startBtn.classList.add("start-button");
        startBtn.setAttribute("type", "submit");
        startBtn.setAttribute("value", "Start Game");
        document.querySelector(".player-form").appendChild(startBtn)

        document.querySelector(".hide-board").style.display = "none";
        document.querySelector(".start-game-div").style.display = "block";
    }
    
    return {reset};

})();



//function that handles creating player objects and initiating game
const initGame = (function (){
    const startBtn = document.querySelector(".start-button");
    function init(e) {
        console.log("starting")
            e.preventDefault();
            console.log("again")
            
            let player1;
            let player2;
            console.log(player1);

            
            const player1Name = document.querySelector("#first-player-field").value;
            const player2Name = document.querySelector("#second-player-field").value;
            if (player1Name != "" && player2Name != ""){
                player1 = createPlayer(player1Name)
                player1.setPlayStatus(true);
                player1.setShape("O");

                player2 = createPlayer(player2Name);
                player2.setPlayStatus(false);
                player2.setShape("X");

                gameHandler.runGame(player1, player2);
            }

    }

     startBtn.addEventListener("click", init)
    
    return {init}
    
})();


    window.addEventListener('load', function() {
    document.querySelector('.start-game-div').classList.add('visible');
  });



