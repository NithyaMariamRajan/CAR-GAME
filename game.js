// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const playerCar = { x: 100, y: 500, width: 50, height: 100, speed: 5 };

const enemyCars = [
    { x: 200, y: 100, width: 50, height: 100, scored: false },
    { x: 400, y: 200, width: 50, height: 100, scored: false },
    { x: 600, y: 300, width: 50, height: 100, scored: false },
    { x: 300, y: 400, width: 50, height: 100, scored: false }
];
let score = 0;
let speedInterval = null;

// Function to start the game
function startGame() {
    playerCar.y = 500;
    playerCar.speed = 5;
    score = 0;
    enemyCars.forEach(enemy => enemy.scored = false);

    if (speedInterval) {
        clearInterval(speedInterval);
    }

    // Increase player speed every 5 seconds
    speedInterval = setInterval(() => {
        playerCar.speed += 1;
    }, 5000);

    gameLoop();
}

function checkCollision(player, enemy) {

    if (player.y + player.height < enemy.y + enemy.height && !enemy.scored) {
        score += 10;
        enemy.scored = true;
    }
}

// Update game state
function update() {
    playerCar.y -= playerCar.speed;


    enemyCars.forEach(enemy => {
        checkCollision(playerCar, enemy);
    });
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas


    ctx.fillStyle = 'yellow';
    ctx.fillRect(playerCar.x, playerCar.y, playerCar.width, playerCar.height);


    ctx.fillStyle = 'green';
    enemyCars.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });


    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Main game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

startGame();