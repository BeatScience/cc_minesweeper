'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'flipTile',

        // Flip the tiles depending on whats next to them on the board
        value: function flipTile(flipRow, flipColumn) {
            if (this._playerBoard[flipRow][flipColumn] !== ' ') {
                console.log('This tile has already been flipped!');
                return;
            } else if (this._bombBoard[flipRow][flipColumn] === 'B') {
                this._playerBoard[flipRow][flipColumn] = 'B';
            } else {
                this._playerBoard[flipRow][flipColumn] = this.getNumberOfNeighbourBombs(flipRow, flipColumn);
            }
            this._numberOfTiles--;
        }
        // Check neighbour tiles for bombs

    }, {
        key: 'getNumberOfNeighbourBombs',
        value: function getNumberOfNeighbourBombs(flipRow, flipColumn) {
            var _this = this;

            var neighbourOffsets = [[0, 1], [1, 1], [1, 0], [1, -1], [-1, -1], [-1, 0], [0, -1], [-1, 1]];
            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;
            var numberOfSurroundingBombs = 0;
            neighbourOffsets.forEach(function (offset) {
                var neighbourRowIndex = flipRow + offset[0];
                var neighbourColumnIndex = flipColumn + offset[1];
                if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows && neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns) {
                    if (_this._bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
                        numberOfSurroundingBombs++;
                    }
                }
            });
            return numberOfSurroundingBombs;
        }
    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles !== this._numberOfBombs;
        }
    }, {
        key: 'print',
        value: function print() {
            console.log(this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
        }
        // Generates the player board

    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
            var board = [];
            for (var rowAmount = 0; rowAmount < numberOfRows; rowAmount++) {
                var row = [];
                for (var columnAmount = 0; columnAmount < numberOfColumns; columnAmount++) {
                    row.push(' ');
                }
                board.push(row);
            }
            return board;
        }
        // Generates the bomb board

    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
            var board = [];
            for (var rowAmount = 0; rowAmount < numberOfRows; rowAmount++) {
                var row = [];
                for (var columnAmount = 0; columnAmount < numberOfColumns; columnAmount++) {
                    row.push(null);
                }
                board.push(row);
            }
            var numberOfBombsPlaced = 0;
            while (numberOfBombsPlaced < numberOfBombs) {
                //  The code in this while loop has the potential to place bombs on top of already existing bombs. This will be fixed with control flow.
                var randomRowIndex = Math.floor(Math.random() * numberOfRows);
                var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
                if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                    board[randomRowIndex][randomColumnIndex] = 'B';
                    numberOfBombsPlaced++;
                }
            }
            return board;
        }
    }]);

    return Board;
}();