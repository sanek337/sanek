document.addEventListener('DOMContentLoaded', () => {
    const symbols = ["😊", "😉", "😁", "😎", "🙈", "🤨", "😝", "😇"];
    const field = document.getElementById('game-field');
    const message = document.getElementById('message');
    let flippedCards = [], lockFlip = false;

    // Генерация поля
    function generateField() {
        const shuffledSymbols = [...symbols, ...symbols]
                                .sort(() => Math.random() - 0.5)
                                .map(symbol => ({ symbol }));

        shuffledSymbols.forEach(({symbol}) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;

            const faceBack = document.createElement('div');
            faceBack.classList.add('face-back');

            const faceFront = document.createElement('div');
            faceFront.classList.add('face-front');
            faceFront.textContent = symbol;

            card.append(faceBack);
            card.append(faceFront);
            card.addEventListener('click', flipCard);
            field.appendChild(card);
        });
    }

    // Переворот карточки
    function flipCard(event) {
        if(lockFlip || this.classList.contains('flip') || this.classList.contains('matched')) return;

        this.classList.add('flip');
        flippedCards.push(this);

        if(flippedCards.length === 2) {
            lockFlip = true;
            setTimeout(checkMatch, 1000); // Пауза перед проверкой совпадения
        }
    }

    // Проверка соответствия карточек
    function checkMatch() {
        const [firstCard, secondCard] = flippedCards;
        if(firstCard.dataset.symbol === secondCard.dataset.symbol) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            flippedCards = [];
            checkWinCondition();
        } else {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            flippedCards = [];
        }
        lockFlip = false;
    }

    // Проверка окончания игры
    function checkWinCondition() {
        const matchedCards = document.querySelectorAll('.matched');
        if(matchedCards.length === symbols.length * 2) {
            message.textContent = 'Победа! Поздравляем!';
        }
    }

    // Начало игры
    generateField();
});