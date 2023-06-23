import gameController from "./gameController";
import createHtmlElement from "./createHtml";

const displayController = function () {
  let gameStarted = false;
  const mainDiv = document.querySelector(".main");
  const labelDiv = createHtmlElement(
    "label",
    null,
    ["main-label"],
    "Computer vs Human"
  );
  const boardsDiv = createHtmlElement("div", null, ["boards"], null);
  const playerDiv = createHtmlElement("div", "player", ["board"], null);
  const computerDiv = createHtmlElement("div", "computer", ["board"], null);
  const resetDiv = createHtmlElement("button", null, ["reset"], "Reset");
  boardsDiv.appendChild(playerDiv);
  boardsDiv.appendChild(computerDiv);
  mainDiv.appendChild(labelDiv);
  mainDiv.appendChild(boardsDiv);
  mainDiv.appendChild(resetDiv);

  function clickHandlerPlay(e) {
    if (e.target.className === "board") return;
    const { cellRow } = e.target.dataset;
    const { cellCol } = e.target.dataset;

    gameController.playRound(cellRow, cellCol);
    updateScreen();
  }

  function clickHandlerPlace(e) {
    if (e.target.className === "board") return;
    const { cellRow } = e.target.dataset;
    const { cellCol } = e.target.dataset;

    console.log(`${cellRow}, ${cellCol} clicked!`);
    if (gameController.placePlayerShip(cellRow, cellCol)) {
      gameStarted = true;
    }

    updateScreen();
  }

  function drawPlayerBoard() {
    const board = gameController.getPlayerBoard().getBoard();
    board.forEach((row, rowIndex) => {
      row.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.dataset.cellRow = rowIndex;
        cellDiv.dataset.cellCol = index;
        cellDiv.dataset.data = cell;
        cellDiv.classList.add("cell");
        if (board[rowIndex][index] === "m") {
          cellDiv.classList.add("miss");
          cellDiv.textContent = "X";
        } else if (board[rowIndex][index] === "h") {
          cellDiv.classList.add("hit");
        } else if (board[rowIndex][index] === null) {
        } else {
          cellDiv.classList.add("ship");
        }
        playerDiv.append(cellDiv);
      });
    });
  }

  function drawComputerBoard() {
    const board = gameController.getComputerBoard().getBoard();
    board.forEach((row, rowIndex) => {
      row.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.dataset.cellRow = rowIndex;
        cellDiv.dataset.cellCol = index;
        cellDiv.dataset.data = cell;
        cellDiv.classList.add("cell");
        if (board[rowIndex][index] === "m") {
          cellDiv.classList.add("miss");
          cellDiv.textContent = "X";
        } else if (board[rowIndex][index] === "h") {
          cellDiv.classList.add("hit");
        } else if (board[rowIndex][index] === null) {
        } else {
          cellDiv.classList.add("ship");
        }
        computerDiv.append(cellDiv);
      });
    });
  }

  const updateScreen = () => {
    playerDiv.innerHTML = "";
    computerDiv.innerHTML = "";
    drawPlayerBoard();
    drawComputerBoard();

    if (gameController.getWinner() !== "") {
      labelDiv.textContent = `Winner is : ${gameController.getWinner()}`;
      computerDiv.removeEventListener("click", clickHandlerPlay);
    } else if (gameStarted) {
      labelDiv.textContent = "Game Start!";
      playerDiv.removeEventListener("click", clickHandlerPlace);
      computerDiv.addEventListener("click", clickHandlerPlay);
    } else {
      labelDiv.textContent = "Place your ship!";
      playerDiv.addEventListener("click", clickHandlerPlace);
    }
  };

  const clearScreen = () => {
    gameController.resetGame();
    gameStarted = false;
    updateScreen();
  };

  resetDiv.addEventListener("click", clearScreen);

  return {
    updateScreen,
  };
};

export default displayController;
