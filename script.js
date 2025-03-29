document.addEventListener("DOMContentLoaded", () => {
    const playerBoard = document.getElementById("player-board");
    const enemyBoard = document.getElementById("enemy-board");
    const message = document.getElementById("message");

    function createBoard(boardElement, isEnemy) {
        let board = [];
        for (let i = 0; i < 10; i++) {
            board[i] = [];
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                board[i][j] = cell;
                boardElement.appendChild(cell);
                if (isEnemy) {
                    cell.addEventListener("click", () => playerAttack(i, j, cell));
                }
            }
        }
        return board;
    }

    function placeShipsRandomly(board) {
        let ships = [5, 4, 3, 3, 2];
        for (let ship of ships) {
            let placed = false;
            while (!placed) {
                let row = Math.floor(Math.random() * 10);
                let col = Math.floor(Math.random() * 10);
                let horizontal = Math.random() < 0.5;
                let valid = true;
                for (let i = 0; i < ship; i++) {
                    let r = horizontal ? row : row + i;
                    let c = horizontal ? col + i : col;
                    if (r >= 10 || c >= 10 || board[r][c].classList.contains("ship")) {
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    for (let i = 0; i < ship; i++) {
                        let r = horizontal ? row : row + i;
                        let c = horizontal ? col + i : col;
                        board[r][c].classList.add("ship");
                    }
                    placed = true;
                }
            }
        }
    }

    let playerGrid = createBoard(playerBoard, false);
    let enemyGrid = createBoard(enemyBoard, true);
    placeShipsRandomly(playerGrid);
    placeShipsRandomly(enemyGrid);

    function playerAttack(row, col, cell) {
        if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;
        if (cell.classList.contains("ship")) {
            cell.classList.add("hit");
            message.textContent = "Hit! Enemy's turn.";
        } else {
            cell.classList.add("miss");
            message.textContent = "Miss! Enemy's turn.";
        }
        setTimeout(enemyTurn, 1000);
    }

    function enemyTurn() {
        let row, col, cell;
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            cell = playerGrid[row][col];
        } while (cell.classList.contains("hit") || cell.classList.contains("miss"));

        if (cell.classList.contains("ship")) {
            cell.classList.add("hit");
            message.textContent = "Enemy hit your ship! Your turn.";
        } else {
            cell.classList.add("miss");
            message.textContent = "Enemy missed! Your turn.";
        }
    }
});
