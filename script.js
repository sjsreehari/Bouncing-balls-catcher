
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;


let balls = [];
let cursorX = gameCanvas.width / 2;
let cursorY = gameCanvas.height / 2;
let totalCaught = 0;


let colors = ['orange', 'cyan', 'lime', 'pink', 'teal'];
let cursorRadius = 30;


document.addEventListener('mousemove', function(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

function Ball(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = (Math.random() * 4) - 2;
    this.dy = (Math.random() * 4) - 2;
}


Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
};


Ball.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > gameCanvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
    }
    if (this.y + this.radius > gameCanvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
    }

    this.checkCollision();
    this.draw();
};


Ball.prototype.checkCollision = function() {
    let distX = this.x - cursorX;
    let distY = this.y - cursorY;
    let distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < this.radius + cursorRadius) {
        totalCaught++;
        updateStatusBox();
        this.respawn();
    }
};


Ball.prototype.respawn = function() {
    this.x = Math.random() * gameCanvas.width;
    this.y = Math.random() * gameCanvas.height;
    this.dx = (Math.random() * 4) - 2;
    this.dy = (Math.random() * 4) - 2;
};


function updateStatusBox() {
    document.getElementById('caughtCount').innerText = totalCaught;
}


function init() {
    for (let i = 0; i < 15; i++) {
        let x = Math.random() * gameCanvas.width;
        let y = Math.random() * gameCanvas.height;
        let radius = 20;
        let color = colors[Math.floor(Math.random() * colors.length)];
        balls.push(new Ball(x, y, radius, color));
    }
}


function animate() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    balls.forEach(function(ball) {
        ball.update();
    });

    ctx.beginPath();
    ctx.arc(cursorX, cursorY, cursorRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(animate);
}

init();
animate();
