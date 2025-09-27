document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const slowBtn = document.getElementById('slow-btn');
    const mediumBtn = document.getElementById('medium-btn');
    const fastBtn = document.getElementById('fast-btn');

    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = {};
    let direction = { x: 0, y: 0 };
    let score = 0;
    let speed = 100; // Default speed
    let gameInterval;
    let isGameOver = false;

    function startGame() {
        isGameOver = false;
        snake = [{ x: 10, y: 10 }];
        food = {};
        direction = { x: 0, y: 0 };
        score = 0;
        scoreDisplay.textContent = score;
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
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1);
        });

        ctx.fillStyle = '#f00';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
    }

    function update() {
        if (isGameOver) return;

        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Check for game over conditions
        if (
            head.x < 0 || head.x >= canvas.width / gridSize ||
            head.y < 0 || head.y >= canvas.height / gridSize ||
            checkCollision(head)
        ) {
            isGameOver = true;
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
        const newDirection = { x: direction.x, y: direction.y };
        switch (e.key) {
            case 'ArrowUp':
                if (direction.y === 0) newDirection.x = 0, newDirection.y = -1;
                break;
            case 'ArrowDown':
                if (direction.y === 0) newDirection.x = 0, newDirection.y = 1;
                break;
            case 'ArrowLeft':
                if (direction.x === 0) newDirection.x = -1, newDirection.y = 0;
                break;
            case 'ArrowRight':
                if (direction.x === 0) newDirection.x = 1, newDirection.y = 0;
                break;
        }
        if (newDirection.x !== direction.x || newDirection.y !== direction.y) {
            direction = newDirection;
        }
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

    // Start the game initially
    startGame();
});
