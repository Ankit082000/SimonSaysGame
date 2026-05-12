let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

// Start Game

document.addEventListener("keypress", function () {

    if (!started) {
        started = true;
        levelUp();
    }
});

// Flash Effect

function gameFlash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 550);
}

function userFlash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 550);
}

// Level Logic

function levelUp() {

    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
}

// Check Answer

function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        document.body.classList.add("game-over");

        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 300);

        if (level > highScore) {
            highScore = level;
            document.getElementById("highScore").innerText = highScore;
        }

        h2.innerHTML = `Game Over! Your Score Was <b>${level}</b><br>Press Any Key To Restart`;

        reset();
    }
}

// Button Press

function btnPress() {

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset Game

function reset() {

    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
