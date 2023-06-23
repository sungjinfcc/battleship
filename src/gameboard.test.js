import createGameBoard from "./gameboard";
import Ship from "./ship";

const myGameBoard = createGameBoard();
const myShip = new Ship(5);
const anotherShip = new Ship(4);

myGameBoard.resetBoard();

myGameBoard.placeShip(3, 3, myShip); // 3,3 ~ 7,3
myGameBoard.placeShip(0, 6, anotherShip); // 0,6 ~ 3,6

test("placeShip 1", () => {
  expect(myGameBoard.getBoard()[5][3].length).toBe(5);
});
test("placeShip 2", () => {
  expect(myGameBoard.getBoard()[3][6].length).toBe(4);
});

myGameBoard.receiveAttack(6, 4);
test("receiveAttack empty", () => {
  expect(myGameBoard.getBoard()[6][4]).toBe("m");
});

myGameBoard.receiveAttack(3, 3);
test("receiveAttack ship 1", () => {
  expect(myGameBoard.getBoard()[7][3].hitCount).toBe(1);
});
myGameBoard.receiveAttack(0, 6);
myGameBoard.receiveAttack(1, 6);
myGameBoard.receiveAttack(2, 6);
test("receiveAttack ship 2", () => {
  expect(myGameBoard.getBoard()[3][6].hitCount).toBe(3);
});

test("2 Ships are the same", () => {
  const board = myGameBoard.getBoard();
  expect(board[3][3] === board[4][3]).toBe(true);
});

test("2 Ships are not the same", () => {
  const board = myGameBoard.getBoard();
  expect(board[3][3] === board[3][6]).toBe(false);
});

// test("isAllSunk 1", () => {
//   expect(myGameBoard.isAllSunk()).toBe(true);
// });
