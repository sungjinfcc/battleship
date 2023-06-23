import createGameBoard from "./gameboard";
import Ship from "./ship";

const gameController = (() => {
  const playerBoard = createGameBoard();
  const computerBoard = createGameBoard();

  let winner = "";
  let playerShipLength = 5;

  const placeComputerShip = () => {
    for (let i = 5; i > 0; ) {
      const randomX = Math.floor(Math.random() * 8);
      const randomY = Math.floor(Math.random() * 8);
      if (computerBoard.placeShip(randomX, randomY, new Ship(i))) i -= 1;
    }
  };

  const placePlayerShip = (x, y) => {
    if (playerBoard.placeShip(x, y, new Ship(playerShipLength))) {
      playerShipLength -= 1;
    }
    if (playerShipLength === 0) return true;
    return false;
  };

  const resetGame = () => {
    winner = "";
    playerShipLength = 5;
    playerBoard.resetBoard();
    computerBoard.resetBoard();
    placeComputerShip();
  };

  const checkWinCondition = () => {
    if (!playerBoard.isAllSunk() && !computerBoard.isAllSunk()) return false;

    if (playerBoard.isAllSunk()) {
      winner = "Computer";
    } else if (computerBoard.isAllSunk()) {
      winner = "Player";
    }
    return true;
  };

  const playComputer = async () => {
    let randomX;
    let randomY;
    do {
      randomX = Math.floor(Math.random() * 8);
      randomY = Math.floor(Math.random() * 8);
    } while (
      playerBoard.getBoard()[randomX][randomY] === "m" ||
      playerBoard.getBoard()[randomX][randomY] === "h"
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    playerBoard.receiveAttack(randomX, randomY);
    if (checkWinCondition()) {
      return true;
    }
    return false;
  };

  const playRound = (x, y) => {
    if (
      computerBoard.getBoard()[x][y] === "m" ||
      computerBoard.getBoard()[x][y] === "h"
    )
      return false;
    computerBoard.receiveAttack(x, y);
    if (checkWinCondition()) {
      return true;
    }

    return false;
  };

  const getPlayerBoard = () => playerBoard;
  const getComputerBoard = () => computerBoard;
  const getWinner = () => winner;

  return {
    resetGame,
    playRound,
    playComputer,
    getPlayerBoard,
    getComputerBoard,
    getWinner,
    placePlayerShip,
  };
})();

export default gameController;
