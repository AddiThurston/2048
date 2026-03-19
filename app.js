let grid = [];
setupGrid();
displayGrid();
const statusText = document.getElementById("status");
const newGame = document.getElementById("newGame");
const scoreText = document.getElementById("score");
let score = 0;

function setupGrid() {
    for (let i = 0; i < 4; i++) {
        grid[i] = [];
        for (let j = 0; j < 4; j++) {
            grid[i][j] = 0;
        }
    }
    newNum();
    newNum();
}

function displayGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const val = grid[i][j];
            const element = document.getElementById((i * 10 + j).toString());
            element.textContent = val;
            element.className = "num n" + val;
            if (val == 0) {
                element.textContent = "";
            }
        }
    }
    if (isFull()) {
        okay = false;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (i > 0 && grid[i][j] == grid[i - 1][j] || i < 3 && grid[i][j] == grid[i + 1][j] || j > 0 && grid[i][j] == grid[i][j - 1] || j < 3 && grid[i][j] == grid[i][j + 1]) {
                    okay = true;
                }
            }
        }
        if (okay == false) {
            statusText.textContent = "You Lose";
        }
    }
}

newGame.addEventListener("click", function(event) {
    setupGrid();
    displayGrid();
})

document.addEventListener("keydown", function (event) {
    const old = structuredClone(grid);
    switch (event.key) {
        case "ArrowLeft":
            event.preventDefault();
            left();
            if (JSON.stringify(old) === JSON.stringify(grid)) break;
            newNum();
            displayGrid();
            break;
        case "ArrowRight":
            event.preventDefault();
            right();
            if (JSON.stringify(old) === JSON.stringify(grid)) break;
            newNum();
            displayGrid();
            break;
        case "ArrowUp":
            event.preventDefault();
            up();
            if (JSON.stringify(old) === JSON.stringify(grid)) break;
            newNum();
            displayGrid();
            break;
        case "ArrowDown":
            event.preventDefault();
            down();
            if (JSON.stringify(old) === JSON.stringify(grid)) break;
            newNum();
            displayGrid();
            break;
        default:
            return;
    }
    scoreText.textContent = "Score: " + score;
});

function up() {
    for (let y = 1; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            let val = grid[y][x];
            let i = y - 1;
            if (val != 0) {
                while (i > 0 && grid[i][x] == 0) {
                    i--;
                }
                if (grid[i][x] == val) {
                    grid[y][x] = 0;
                    grid[i][x] += val;
                    score += val*2;
                } else if (grid[i][x] == 0) {
                    grid[y][x] = 0;
                    grid[i][x] = val;
                } else {
                    grid[y][x] = 0;
                    grid[i + 1][x] = val;
                }
            }
        }
    }
}

function down() {
    for (let y = 2; y >= 0; y--) {
        for (let x = 0; x < 4; x++) {
            let val = grid[y][x];
            let i = y + 1;
            if (val != 0) {
                while (i < 3 && grid[i][x] == 0) {
                    i++;
                }
                if (grid[i][x] == val) {
                    grid[y][x] = 0;
                    grid[i][x] += val;
                    score += val*2;
                } else if (grid[i][x] == 0) {
                    grid[y][x] = 0;
                    grid[i][x] = val;
                } else {
                    grid[y][x] = 0
                    grid[i - 1][x] = val
                }
            }
        }
    }
}

function left() {
    for (let y = 0; y < 4; y++) {
        for (let x = 1; x < 4; x++) {
            let val = grid[y][x];
            let i = x - 1;
            if (val != 0) {
                while (i > 0 && grid[y][i] == 0) {
                    i--;
                }
                if (grid[y][i] == val) {
                    grid[y][x] = 0;
                    grid[y][i] += val;
                    score += val*2;
                } else if (grid[y][i] == 0) {
                    grid[y][x] = 0;
                    grid[y][i] = val;
                } else {
                    grid[y][x] = 0
                    grid[y][i + 1] = val
                }
            }
        }
    }
}

function right() {
    for (let y = 0; y < 4; y++) {
        for (let x = 2; x >= 0; x--) {
            let val = grid[y][x];
            let i = x + 1;
            if (val != 0) {
                while (i < 3 && grid[y][i] == 0) {
                    i++;
                }
                if (grid[y][i] == val) {
                    grid[y][x] = 0;
                    grid[y][i] += val;
                    score += val*2;
                } else if (grid[y][i] == 0) {
                    grid[y][x] = 0;
                    grid[y][i] = val;
                } else {
                    grid[y][x] = 0
                    grid[y][i - 1] = val
                }
            }
        }
    }
}

function isFull() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function newNum() {
    if (isFull()) {
        return false;
    }
    let i = rand(0, 3);
    let j = rand(0, 3);
    while (grid[i][j] != 0) {
        i = rand(0, 3);
        j = rand(0, 3);
    }
    grid[i][j] = 2;
    return true;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
