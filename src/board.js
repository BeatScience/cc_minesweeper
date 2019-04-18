export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard() {
        return this._playerBoard;
    }
    // Flip the tiles depending on whats next to them on the board
    flipTile(flipRow, flipColumn) {
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
    getNumberOfNeighbourBombs(flipRow, flipColumn) {
        const neighbourOffsets = [[0, 1], [1, 1], [1, 0], [1, -1], [-1, -1], [-1, 0], [0, -1], [-1, 1]];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfSurroundingBombs = 0;
        neighbourOffsets.forEach(offset => {
            const neighbourRowIndex = flipRow + offset[0];
            const neighbourColumnIndex = flipColumn + offset[1];
            if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows && neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns) {
                if (this._bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
                    numberOfSurroundingBombs++;
                }
            }
        });
        return numberOfSurroundingBombs;
    }
    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }
    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }
    // Generates the player board
    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        const board = [];
        for (let rowAmount = 0; rowAmount < numberOfRows; rowAmount++) {
            const row = [];
            for (let columnAmount = 0; columnAmount < numberOfColumns; columnAmount++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }
    // Generates the bomb board
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        const board = [];
        for (let rowAmount = 0; rowAmount < numberOfRows; rowAmount++) {
            const row = [];
            for ( let columnAmount = 0; columnAmount < numberOfColumns; columnAmount++) {
                row.push(null);
            }
            board.push(row);
        }
        let numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < numberOfBombs) {
            //  The code in this while loop has the potential to place bombs on top of already existing bombs. This will be fixed with control flow.
            const randomRowIndex = Math.floor(Math.random() * numberOfRows);
            const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }
}