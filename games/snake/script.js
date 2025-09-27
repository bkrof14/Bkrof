document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const slowBtn = document.getElementById('slow-btn');
    const mediumBtn = document.getElementById('medium-btn');
    const fastBtn = document.getElementById('fast-btn');
    const restartBtn = document.getElementById('restart-btn');

    const gridSize = 20;
    let snake = [];
    let food = {};
    let direction = { x: 0, y: 0 };
    let lastDirection = { x: 0, y: 0 };
    let score = 0;
    let speed = 100; // Default speed
    let gameInterval;

    function startGame() {
        snake = [{ x: 10, y: 10 }];
        score = 0;
        scoreDisplay.textContent = score;
        direction = { x: 0, y: 0 };
        lastDirection = { x: 0, y: 0 };
        generateFood();
        resetGameInterval();
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = '#0f0';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1);
        });

        // Draw food
        ctx.fillStyle = '#f00';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
    }

    function update() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Game over conditions
        if (
            head.x < 0 || head.x >= canvas.width / gridSize ||
            head.y < 0 || head.y >= canvas.height / gridSize ||
            checkCollision(head)
        ) {
            clearInterval(gameInterval);
            alert(`Game Over! Your score was ${score}.`);
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
        lastDirection = direction;
    }

    function checkCollision(head) {
        return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    function resetGameInterval() {
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            update();
            draw();
        }, speed);
    }

    document.addEventListener('keydown', e => {
        let newDirection = direction;
        switch (e.key) {
            case 'ArrowUp':
                if (lastDirection.y === 0) newDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (lastDirection.y === 0) newDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (lastDirection.x === 0) newDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (lastDirection.x === 0) newDirection = { x: 1, y: 0 };
                break;
        }
        direction = newDirection;
    });

    // Speed selectors
    slowBtn.addEventListener('click', () => {
        speed = 200;
        resetGameInterval();
    });
    mediumBtn.addEventListener('click', () => {
        speed = 100;
        resetGameInterval();
    });
    fastBtn.addEventListener('click', () => {
        speed = 50;
        resetGameInterval();
    });

    // Restart button
    restartBtn.addEventListener('click', startGame);

    // Start the game initially
    startGame();
});
