// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('Game over bitches! You lose. Bad times. Here was the final board:');
            this._board.print();
        } else if (!this._board.hasSafeTiles()) {
            console.log("Well, I mean, you won, but let's not be all douchy about it. And don't forget, I have bombs at my disposal! Here was your winning board:");
            this._board.print();
        } else {
            console.log('Current board:');
            this._board.print();
        } 
    }
}