//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//potter
let potterWidth = 88;
let potterHeight = 94;
let potterX = 50;
let potterY = boardHeight - potterHeight;
let potterImg;

let potter = {
    x: potterX,
    y: potterY,
    width: potterWidth,
    height: potterHeight
}

//obstáculos 
let obstaculosArray = [];

let obstaculos1Width = 34;
let obstaculos2Width = 69;
let obstaculos3Width = 102;

let obstaculosHeight = 70;
let obstaculosX = 700;
let obstaculosY = boardHeight - obstaculosHeight;

let obstaculos1Img;
let obstaculos2Img;
let obstaculos3Img;

//física do jogo
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");


    potterImg = new Image();
    potterImg.src = "img/harrypotter.gif";
    potterImg.onload = function() {
        context.drawImage(potterImg, potter.x, potter.y, potter.width, potter.height);
    }

    obstaculos1Img = new Image();
    obstaculos1Img.src = "img/malfoy.png";

    obstaculos2Img = new Image();
    obstaculos2Img.src = "img/pettigrew-.png";

    obstaculos3Img = new Image();
    obstaculos3Img.src = "img/voldemort.png";

    requestAnimationFrame(update);
    setInterval(placeobstaculos, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", movepotter);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //potter
    velocityY += gravity;
    potter.y = Math.min(potter.y + velocityY, potterY);
    context.drawImage(potterImg, potter.x, potter.y, potter.width, potter.height);

    //obstáculos
    for (let i = 0; i < obstaculosArray.length; i++) {
        let obstaculos = obstaculosArray[i];
        obstaculos.x += velocityX;
        context.drawImage(obstaculos.img, obstaculos.x, obstaculos.y, obstaculos.width, obstaculos.height);

        if (detectCollision(potter, obstaculos)) {
            gameOver = true;
            potterImg.src = "img/potter-dead.png";
            potterImg.onload = function() {
                context.drawImage(potterImg, potter.x, potter.y, potter.width, potter.height);
            }
        }
    }

    //pontuação
    context.fillStyle = "white";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function movepotter(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && potter.y == potterY) {

        velocityY = -10;
    } else if (e.code == "ArrowDown" && potter.y == potterY) {

    }

}

function placeobstaculos() {
    if (gameOver) {
        return;
    }


    let obstaculos = {
        img: null,
        x: obstaculosX,
        y: obstaculosY,
        width: null,
        height: obstaculosHeight
    }

    let placeobstaculosChance = Math.random();

    if (placeobstaculosChance > .90) {
        obstaculos.img = obstaculos3Img;
        obstaculos.width = obstaculos3Width;
        obstaculosArray.push(obstaculos);
    } else if (placeobstaculosChance > .70) {
        obstaculos.img = obstaculos2Img;
        obstaculos.width = obstaculos2Width;
        obstaculosArray.push(obstaculos);
    } else if (placeobstaculosChance > .50) {
        obstaculos.img = obstaculos1Img;
        obstaculos.width = obstaculos1Width;
        obstaculosArray.push(obstaculos);
    }

    if (obstaculosArray.length > 5) {
        obstaculosArray.shift();
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}