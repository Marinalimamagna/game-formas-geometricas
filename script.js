let score = 0;
let targetShape = "Círculo"; // Forma inicial
let timeLimit = 50; // Tempo limite em segundos
let goal = 10; // Número de figuras que o jogador precisa acertar
let timer; // Controlador do cronômetro

const shapes = [
    { id: 'circle', name: 'Círculo' },
    { id: 'square', name: 'Quadrado' },
    { id: 'star', name: 'Estrela' },
    { id: 'triangle', name: 'Triângulo' },
    { id: 'rectangle', name: 'Retângulo' },
    { id: 'oval', name: 'Oval' },
    { id: 'heart', name: 'Coração' }
];

// Atualiza a instrução na tela
function updateInstruction() {
    document.getElementById('instruction').innerText = `Clique no ${targetShape}! Tempo restante: ${timeLimit}s`;
}

// Escolhe uma forma alvo aleatória
function setTargetShape() {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    targetShape = shapes[randomIndex].name;
    updateInstruction();
    moveShapes(); // Atualiza as posições das formas
}

// Move as formas aleatoriamente pela área de jogo
function moveShapes() {
    const gameArea = document.querySelector('.game-area');
    const shapesElements = document.querySelectorAll('.shape');

    shapesElements.forEach(shape => {
        const randomX = Math.random() * (gameArea.clientWidth - 100); // 100 = largura da forma
        const randomY = Math.random() * (gameArea.clientHeight - 100); // 100 = altura da forma

        shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

// Mostra fogos de artifício e mensagem de vitória
// Mostra fogos de artifício e mensagem de vitória
function showVictory() {
    document.body.innerHTML = `
        <div style="text-align: center; margin-top: 100px;">
            <h1 style="font-size: 48px; color: #4CAF50;">Você venceu! Parabéns!</h1>
            <div id="fireworks" style="width: 100%; height: 400px; position: relative;"></div>
        </div>
    `;
    startFireworks();  // Agora a função que chama os fogos de artifício está separada.
}

// Função para iniciar os fogos de artifício
function startFireworks() {
    // Verifica se o script dos fogos já foi carregado
    if (typeof Fireworks === 'undefined') {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/fireworks-js@2.10.2/dist/fireworks.min.js";
        script.onload = () => {
            const fireworks = new Fireworks(document.getElementById("fireworks"), {
                rocketsPoint: 50,
                speed: 4,
            });
            fireworks.start();
        };
        document.head.appendChild(script);
    } else {
        // Caso o script já tenha sido carregado, começa imediatamente
        const fireworks = new Fireworks(document.getElementById("fireworks"), {
            rocketsPoint: 50,
            speed: 4,
        });
        fireworks.start();
    }
}

// Encerrar o jogo quando o tempo acaba
function endGame() {
    if (score < goal) {
        alert("O tempo acabou! Tente novamente.");
        resetGame();
    }
}

// Função chamada ao clicar em uma forma
function onShapeClick(shape) {
    if (shape === targetShape) {
        score++;
        document.getElementById('score').innerText = score;

        if (score >= goal) {
            clearTimeout(timer); // Para o cronômetro
            showVictory();
        } else {
            setTargetShape();
        }
    } else {
        alert("Tente novamente! Você clicou na forma errada.");
    }
}

// Inicia o cronômetro
function startTimer() {
    timer = setInterval(() => {
        timeLimit--;

        if (timeLimit <= 0) {
            clearInterval(timer);
            endGame();
        } else {
            updateInstruction();
        }
    }, 1000);
}

// Reinicia o jogo
function resetGame() {
    score = 0;
    timeLimit = 30;
    document.getElementById('score').innerText = score;
    setTargetShape();
    clearTimeout(timer);
    startTimer();
}
// Mostra balões e mensagem de vitória
// Função para mostrar os balões e a mensagem de vitória
function showVictory() {
    document.body.innerHTML = `
        <div style="text-align: center; margin-top: 100px;">
            <h1 style="font-size: 48px; color: #4CAF50;">Você venceu! Parabéns!</h1>
            <div id="balloons-container" class="balloons-container">
                <div class="balloon" style="left: 10%;"></div>
                <div class="balloon" style="left: 30%;"></div>
                <div class="balloon" style="left: 50%;"></div>
                <div class="balloon" style="left: 70%;"></div>
                <div class="balloon" style="left: 90%;"></div>
            </div>
        </div>
    `;
}


// Inicializa o jogo
setTargetShape();
startTimer();
