export default function createGameBoard() {
  const board = [];
  const row = 8;
  const col = 8;
  let sinkCount = 0;

  const getBoard = () => board;

  const resetBoard = () => {
    for (let i = 0; i < row; i += 1) {
      board[i] = [];
      for (let j = 0; j < col; j += 1) {
        board[i].push(null);
      }
    }
  };

  const updateBoard = (x, y, value) => {
    board[x][y] = value;
  };

  const placeShip = (stringX, stringY, ship) => {
    // place ship on the coordinate of x, y vertically
    const x = Number(stringX);
    const y = Number(stringY);
    if (x + ship.length > col) {
      return false;
    }
    for (let i = x; i < x + ship.length; i += 1) {
      if (board[i][y] !== null) return false;
    }
    for (let i = x; i < x + ship.length; i += 1) {
      board[i][y] = ship;
    }
    return true;
  };

  const receiveAttack = (x, y) => {
    if (board[x][y] == null) {
      // miss
      board[x][y] = "m";
    } else {
      // hit
      board[x][y].hit();
      if (board[x][y].isSunk()) {
        sinkCount += 1;
      }
      board[x][y] = "h";
    }
  };

  const isAllSunk = () => {
    if (sinkCount === 5) {
      return true;
    }
    return false;
  };

  const getSinkCount = () => sinkCount;

  return {
    getBoard,
    resetBoard,
    placeShip,
    receiveAttack,
    isAllSunk,
    getSinkCount,
  };
}
