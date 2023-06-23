import gameController from "./gameController";
import createHtmlElement from "./createHtml";

const displayController = () => {
  let gameStarted = false;
  let updateScreen;
  const mainDiv = document.querySelector(".main");
  const labelDiv = createHtmlElement(
    "h2",
    null,
    ["main-label"],
    "Computer vs Human"
  );
  const boardsDiv = createHtmlElement("div", null, ["boards"], null);

  const playerDiv = createHtmlElement("div", null, ["player-div"], null);
  const playerLabel = createHtmlElement("h4", null, [], "Player");
  const playerBoard = createHtmlElement("div", "player", ["board"], null);
  const computerDiv = createHtmlElement("div", null, ["computer-div"], null);
  const computerLabel = createHtmlElement("h4", null, [], "Computer");
  const computerBoard = createHtmlElement("div", "computer", ["board"], null);
  const resetDiv = createHtmlElement("button", null, ["reset"], "Reset");

  playerDiv.appendChild(playerLabel);
  playerDiv.appendChild(playerBoard);
  computerDiv.appendChild(computerLabel);
  computerDiv.appendChild(computerBoard);

  boardsDiv.appendChild(playerDiv);
  boardsDiv.appendChild(computerDiv);

  mainDiv.appendChild(labelDiv);
  mainDiv.appendChild(boardsDiv);
  mainDiv.appendChild(resetDiv);

  async function clickHandlerPlay(e) {
    if (e.target.className === "board") return;
    const { cellRow } = e.target.dataset;
    const { cellCol } = e.target.dataset;

    gameController.playRound(cellRow, cellCol);
    updateScreen();
    await gameController.playComputer();
    updateScreen();
  }

  function clickHandlerPlace(e) {
    if (e.target.className === "board") return;
    const { cellRow } = e.target.dataset;
    const { cellCol } = e.target.dataset;

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
        if (gameStarted) cellDiv.classList.add("inactive");
        if (board[rowIndex][index] === "m") {
          cellDiv.classList.add("miss");
          cellDiv.textContent = "X";
        } else if (board[rowIndex][index] === "h") {
          cellDiv.classList.add("hit");
        } else if (board[rowIndex][index] === null) {
          // do nothing for this cell
        } else {
          cellDiv.classList.add("ship");
        }
        playerBoard.append(cellDiv);
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
        if (gameController.getWinner() !== "")
          cellDiv.classList.add("inactive");
        if (board[rowIndex][index] === "m") {
          cellDiv.classList.add("miss");
          cellDiv.textContent = "X";
        } else if (board[rowIndex][index] === "h") {
          cellDiv.classList.add("hit");
        }
        computerBoard.append(cellDiv);
      });
    });
  }

  updateScreen = () => {
    playerBoard.innerHTML = "";
    computerBoard.innerHTML = "";
    drawPlayerBoard();
    drawComputerBoard();

    if (gameController.getWinner() !== "") {
      labelDiv.textContent = `Winner is : ${gameController.getWinner()}`;
      computerBoard.removeEventListener("click", clickHandlerPlay);
    } else if (gameStarted) {
      labelDiv.textContent = "Game Start!";
      playerBoard.removeEventListener("click", clickHandlerPlace);
      computerBoard.addEventListener("click", clickHandlerPlay);
    } else {
      labelDiv.textContent = "Place your ship! 5 -> 4 -> 3 -> 2 -> 1";
      playerBoard.addEventListener("click", clickHandlerPlace);
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
