const BOARD_ELEMENT = document.querySelector('.board');
var activePlayer = 'X';
const TILE_STATUSES = {
    X: 'x',
    O: 'o',
    UNMARKED: 'unmarked'
};
const BOARD = createBoard();

BOARD.forEach(row => {
    row.forEach(tile => {
        BOARD_ELEMENT.append(tile.element);
        tile.element.addEventListener('click', () => {
            markTile(tile);
            checkWin(tile);
        });
    });
});

function createBoard() {
    const BOARD = [];
    for (let x = 0; x < 3; x++) {
        const row = [];
        for (let y = 0; y < 3; y++) {
            const element = document.createElement('div');
            element.dataset.status = TILE_STATUSES.UNMARKED;
            const tile = {
                element,
                x,
                y,
                get status() {
                    return element.dataset.status;
                },
                set status(newStatus) {
                    this.element.dataset.status = newStatus;
                }
            };
            row.push(tile);
        };
        BOARD.push(row);
    };
    return BOARD;
};

function markTile(tile) {
    if (tile.status !== "unmarked") {
        return;
    };

    if (activePlayer === 'X') {
        tile.status = TILE_STATUSES.X;
        tile.element.innerHTML = 'X';
        activePlayer = 'O';
    } else {
        tile.status = TILE_STATUSES.O;
        tile.element.innerHTML = 'O';
        activePlayer = 'X';
    };

    document.querySelector('.active-player').innerHTML = "Player - " + activePlayer;
};

function checkWin(tileInput) {
    const X = tileInput.x;
    const Y = tileInput.y;
    const STATUS = tileInput.status;
    var upDownCount = 0;
    var leftRightCount = 0;
    var diaganolTLBRCount = 0;
    var diaganolTRBLCount = 0;
    var activeTilesCount = 0;

    BOARD.forEach(row => {
        row.forEach(tile => {
            if (tile.x === X && tile.status === STATUS) {
                leftRightCount += 1;
            };

            if (tile.y === Y && tile.status === STATUS) {
                upDownCount += 1;
            };

            if (tile.x === tile.y && tile.status === STATUS) {
                diaganolTLBRCount += 1;
            };

            if (((tile.x === 2 && tile.y === 0) || (tile.x === 1 && tile.y === 1) || (tile.x === 0 && tile.y === 2)) && tile.status === STATUS) {
                diaganolTRBLCount += 1;
            };

            if (tile.status === "x" || tile.status === "o") {
                activeTilesCount += 1;
            };
        });
    });

    if (leftRightCount == 3 || upDownCount == 3 || diaganolTLBRCount == 3 || diaganolTRBLCount == 3) {
        gameEnd(STATUS);
    } else if (activeTilesCount >= 9) {
        gameEnd("draw!");
    };
};

function gameEnd(player) {
    const gameOverDisplay = document.querySelector('.game-over-display');
    var gameOverText = player;
    if (player !== "draw!") {
        gameOverText += " wins!"
    };

    gameOverDisplay.style.zIndex = "1";
    gameOverDisplay.style.backgroundColor = "rgba(0,0,0,0.5)";
    gameOverDisplay.style.color = "rgba(203, 255, 231, 1)";
    gameOverDisplay.innerHTML = gameOverText;

    gameOverDisplay.addEventListener('click', () => {
        gameOverDisplay.style.transitionDuration = "0.25s";
        gameOverDisplay.style.zIndex = "-1";
        gameOverDisplay.style.backgroundColor = "rgba(0,0,0,0)";
        gameOverDisplay.style.color = "rgba(0,0,0,0)";
    });

    BOARD_ELEMENT.addEventListener('click', (e) => e.stopImmediatePropagation(), true);
};