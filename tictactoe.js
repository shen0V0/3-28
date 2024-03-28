let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
    MORE_MOVES_LEFT: 1,
    HUMAN_WINS: 2,
    COMPUTER_WINS: 3,
    DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    // Setup the click event for the "New game" button
    const newBtn = document.getElementById("newGameButton");
    newBtn.addEventListener("click", newGame);

    // Create click-event handlers for each game board button
    const buttons = getGameBoardButtons();
    for (let button of buttons) {
        button.addEventListener("click", function () { boardButtonClicked(button); });
    }

    // Clear the board
    newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
    return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
    
    const buttons = getGameBoardButtons();

    // Ways to win
    const possibilities = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    // Check for a winner first
    for (let indices of possibilities) {
        if (buttons[indices[0]].innerHTML !== "" &&
            buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
            buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
            
            // Found a winner
            if (buttons[indices[0]].innerHTML === "X") {
                return gameStatus.HUMAN_WINS;
            }
            else {
                return gameStatus.COMPUTER_WINS;
            }
        }
    }

    // See if any more moves are left
    for (let button of buttons) {
        if (button.innerHTML !== "X" && button.innerHTML !== "O") {
            return gameStatus.MORE_MOVES_LEFT;
        }
    }

    // If no winner and no moves left, then it's a draw
    return gameStatus.DRAW_GAME;
}

function newGame() {
     const buttons = getGameBoardButtons();
  for (let button of buttons) {
    button.innerHTML = "";
  }
  playerTurn = true;
  document.getElementById("turnInfo").textContent = "Player's turn";
}

function boardButtonClicked(button) {
     if (button.innerHTML == "" && playerTurn) {
    button.innerHTML = "X";
        button.classList.add("x");
    const status = checkForWinner();
    if (status === gameStatus.HUMAN_WINS) {
      alert("You win!");
    } else if (status === gameStatus.DRAW_GAME) {
      alert("It's a draw!");
    } else {
      switchTurn();
      makeComputerMove();
    }
  }

}

function switchTurn() {
   playerTurn = !playerTurn;
   if(playerTurn){
   document.getElementById("turnInfo").textContent ="Player's turn";
   }
   else{
   document.getElementById("turnInfo").textContent = "Computer's turn";
   }
 
}

function makeComputerMove() {
     const buttons = getGameBoardButtons();
  const otherButtons = [...buttons].filter((button) => button.innerHTML == "");
  const number = Math.floor(Math.random() * otherButtons.length);
  const selectedButton = otherButtons[number];
  if (selectedButton) {
    computerMoveTimeout = setTimeout(() => {
     selectedButton.innerHTML = "O";
        selectedButton.classList.add("o");
      const status = checkForWinner();
      if (status == gameStatus.COMPUTER_WINS) {
        alert("Computer wins!");
      } else if (status === gameStatus.DRAW_GAME) {
        alert("It's a draw!");
        
      } else {
        switchTurn();
      }
    },500);
  }
}
