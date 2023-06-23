import gameController from "./gameController";
import Ship from "./ship";

gameController.resetGame();

const shipA = new Ship(5);
const shipB = new Ship(4);
const shipC = new Ship(3);
const shipD = new Ship(2);
const shipE = new Ship(1);

const myBoard = gameController.getMyBoard();
myBoard.placeShip(0, 0, shipA);
myBoard.placeShip(0, 1, shipB);
myBoard.placeShip(0, 2, shipC);
myBoard.placeShip(0, 3, shipD);
myBoard.placeShip(0, 4, shipE);

const computerBoard = gameController.getComputerBoard();
computerBoard.resetBoard();
const shipF = new Ship(5);
computerBoard.placeShip(0, 0, shipF);

test("place ship 1", () => {
  expect(myBoard.getBoard()[3][0].length).toBe(5);
});
test("place ship 2", () => {
  expect(computerBoard.getBoard()[2][0].length).toBe(5);
});

gameController.playRound(0, 0);
gameController.playRound(1, 0);
gameController.playRound(2, 0);
test("Fourth shot", () => {
  expect(gameController.playRound(3, 0)).toBe("Not the end");
});
test("Last shot", () => {
  expect(gameController.playRound(4, 0)).toBe("End");
});

test("hitCount", () => {
  expect(computerBoard.getBoard()[0][0].hitCount).toBe(5);
});
test("length", () => {
  expect(computerBoard.getBoard()[0][0].isSunk()).toBe(true);
});
test("winner", () => {
  expect(gameController.getWinner()).toBe("Player");
});
test("computer board status after got sunk", () => {
  expect(computerBoard.getSinkCount()).toBe(1);
});
