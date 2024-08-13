const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bird = new Image();
bird.src = 'assets/bird.png';

const bg = new Image();
bg.src = 'assets/background.png';

const fg = new Image();
fg.src = 'assets/foreground.png';

const pipeNorth = new Image();
pipeNorth.src = 'assets/pipeNorth.png';

const pipeSouth = new Image();
pipeSouth.src = 'assets/pipeSouth.png';

const fly = new Audio();
fly.src = 'assets/fly.mp3';

const scoreSound = new Audio();
scoreSound.src = 'assets/score.mp3';

const gap = 85;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1.5;

let score = 0;

document.addEventListener('keydown', moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

// Pipe coordinates
let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= canvas.height - fg.height) {
            document.getElementById('gameOver').style.display = 'block';
            return;
        }

        if (pipe[i].x === 5) {
            score++;
            scoreSound.play();
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Score : ' + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

function restartGame() {
    location.reload();
}

bird.onload = draw;
