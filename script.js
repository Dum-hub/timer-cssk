let timer;
let timeLeft = 270; // 4 минуты 30 секунд в секундах
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startResetButton = document.getElementById('startResetButton');
const successButton = document.getElementById('successButton');
const failButton = document.getElementById('failButton');

// Звуки для "Сдал" и "Не сдал"
const successSounds = [
    'sounds/success/success1.mp3',
    'sounds/success/success2.mp3',
    'sounds/success/success3.mp3',
    'sounds/success/success4.mp3',
    'sounds/success/success5.mp3',
    'sounds/success/success6.mp3',
    'sounds/success/success7.mp3',
    // Добавьте больше звуков по необходимости
];

const failSounds = [
    'sounds/fail/fail1.mp3',
    'sounds/fail/fail2.mp3',
    'sounds/fail/fail3.mp3',
    'sounds/fail/fail4.mp3',
    'sounds/fail/fail5.mp3',
    'sounds/fail/fail6.mp3',
    // Добавьте больше звуков по необходимости
];

// Переменные для хранения последнего воспроизведенного звука
let lastSuccessSound = null;
let lastFailSound = null;

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft === 0) {
        clearInterval(timer);
        isRunning = false;
        startResetButton.textContent = 'Старт';
    } else {
        timeLeft--;
    }
}

startResetButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startResetButton.textContent = 'Старт';
        timeLeft = 270;
        updateTimer();
    } else {
        timer = setInterval(updateTimer, 500);
        isRunning = true;
        startResetButton.textContent = 'Рестарт';
    }
});

successButton.addEventListener('click', () => {
    playRandomSound(successSounds, 'success');
});

failButton.addEventListener('click', () => {
    playRandomSound(failSounds, 'fail');
});

function playRandomSound(soundArray, type) {
    if (soundArray.length === 0) return; // Если массив пуст, ничего не воспроизводим

    let randomSound;
    do {
        randomSound = soundArray[Math.floor(Math.random() * soundArray.length)];
    } while (
        (type === 'success' && randomSound === lastSuccessSound) ||
        (type === 'fail' && randomSound === lastFailSound)
    );

    // Обновляем последний воспроизведенный звук
    if (type === 'success') {
        lastSuccessSound = randomSound;
    } else if (type === 'fail') {
        lastFailSound = randomSound;
    }

    const audio = new Audio(randomSound);
    audio.play();
}
