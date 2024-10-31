



const playerTurn = document.getElementById("playersTurn");
const restartBtn = document.getElementById("restartButton");
const boxes = Array.from(document.getElementsByClassName("square"));

const winningStyles = getComputedStyle(document.body).getPropertyValue('--winning-blocks');


let currentPlayer = "X";

let spaces = Array(9).fill(null)

const play = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e){
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() != false){
            playerText = `${currentPlayer} has won`;
            let winningSquares = playerHasWon();
            
            console.log(winningSquares)
        }

        currentPlayer = currentPlayer == "X" ? "O" : "X";
    }
}
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,5,8],
    [2,5,6]
]
function playerHasWon(){
    for (const condintion of winningCombinations) {
        let [a, b, c] = condintion;
        if(spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]){
            return [a, b, c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)
function restart(){
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = "";
    })
    currentPlayer = "X";
    playerText = ""
}


play()