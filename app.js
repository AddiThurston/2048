let grid = [];
const statusText = document.getElementById("status");
const newGame = document.getElementById("newGame");
const scoreText = document.getElementById("score");
let score = 0;
setupGrid();
displayGrid();

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
            const square = document.getElementById((i * 10 + j).toString());
            square.textContent = "";
            square.className = "num n0";
            resetAnimation(square);
            if (val != 0) {
                const tile = document.createElement('div');
                tile.className = "tile num n" + val;
                tile.textContent = val;
                square.appendChild(tile);
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

newGame.addEventListener("click", function (event) {
    setupGrid();
    displayGrid();
})

document.addEventListener("keydown", async function (event) {
    const old = structuredClone(grid);
    switch (event.key) {
        case "ArrowLeft":
            event.preventDefault();
            await left();
            if (JSON.stringify(old) === JSON.stringify(grid)) break;
            newNum();
            break;
        case "ArrowRight":
            event.preventDefault();
            await right();
            if (JSON.stringify(old) === JSON.stringify(grid)) break;
            newNum();
            break;
        case "ArrowUp":
            event.preventDefault();
            await up();
            if (JSON.stringify(old) === JSON.stringify(grid)) break;
            newNum();
            break;
        case "ArrowDown":
            event.preventDefault();
            await down();
            if (JSON.stringify(old) === JSON.stringify(grid)) break;
            newNum();
            break;
        default:
            return;
    }
    scoreText.textContent = "Score: " + score;
    displayGrid();
});

function waitForAnimationEnd(element) {
    return new Promise(resolve => {
        element.addEventListener('transitionend', resolve, { once: true });
    });
}

function resetAnimation(element) {
    element.style.transition = 'transform 0s';
    element.style.transform = 'none';
}

function translate(element, x0, y0, x, y) {
    if (element == null) return;
    element.style.transition = "transform 0.15s";
    if (y != y0)
        element.style.transform = 'translateY(' + (y - y0) * 108 + 'px)';
    else
        element.style.transform = 'translateX(' + (x - x0) * 108 + 'px)';

}

async function up() {
    let element;
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
                    score += val * 2;
                } else if (grid[i][x] == 0) {
                    grid[y][x] = 0;
                    grid[i][x] = val;
                } else {
                    i++;
                    grid[y][x] = 0;
                    grid[i][x] = val;
                }
                element = document.getElementById((y * 10 + x).toString()).firstChild;
                translate(element, x, y, x, i);
            }
        }
    }
    if (element != null) {
        const done = await waitForAnimationEnd(element);
    }
}

async function down() {
    let element;
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
                    score += val * 2;
                } else if (grid[i][x] == 0) {
                    grid[y][x] = 0;
                    grid[i][x] = val;
                } else {
                    i--;
                    grid[y][x] = 0
                    grid[i][x] = val
                }
                element = document.getElementById((y * 10 + x).toString()).firstChild;
                translate(element, x, y, x, i);
            }
        }
    }
    if (element != null) {
        const done = await waitForAnimationEnd(element);
    }
}

async function left() {
    let element;
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
                    score += val * 2;
                } else if (grid[y][i] == 0) {
                    grid[y][x] = 0;
                    grid[y][i] = val;
                } else {
                    i++;
                    grid[y][x] = 0
                    grid[y][i] = val
                }
                element = document.getElementById((y * 10 + x).toString()).firstChild;
                translate(element, x, y, i, y);
            }
        }
    }
    if (element != null) {
        const done = await waitForAnimationEnd(element);
    }
}

async function right() {
    let element;
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
                    score += val * 2;
                } else if (grid[y][i] == 0) {
                    grid[y][x] = 0;
                    grid[y][i] = val;
                } else {
                    i--;
                    grid[y][x] = 0
                    grid[y][i] = val
                }
                element = document.getElementById((y * 10 + x).toString()).firstChild;
                translate(element, x, y, i, y);
            }
        }
    }
    if (element != null) {
        const done = await waitForAnimationEnd(element);
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
