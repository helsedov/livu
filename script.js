// === Аудио-плеер ===
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPause');
const volumeControl = document.getElementById('volume');

if (localStorage.getItem('musicVolume')) {
    bgMusic.volume = parseFloat(localStorage.getItem('musicVolume'));
} else {
    bgMusic.volume = 0.5;
}

volumeControl.value = bgMusic.volume;

volumeControl.addEventListener('input', () => {
    bgMusic.volume = volumeControl.value;
    localStorage.setItem('musicVolume', bgMusic.volume);
});

playPauseBtn.addEventListener('click', async () => {
    if (bgMusic.paused) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            try {
                await playPromise;
                playPauseBtn.textContent = '⏸️';
                localStorage.setItem('musicPlaying', 'true');
            } catch (error) {
                console.log('Автовоспроизведение заблокировано:', error);
                alert('Пожалуйста, нажми на кнопку ▶️, чтобы включить музыку.');
            }
        }
    } else {
        bgMusic.pause();
        playPauseBtn.textContent = '▶️';
        localStorage.setItem('musicPlaying', 'false');
    }
});

window.addEventListener('load', () => {
    if (localStorage.getItem('musicPlaying') === 'true') {
        playPauseBtn.textContent = '⏸️';
    } else {
        playPauseBtn.textContent = '▶️';
    }
});

// === Стихи ===
if (document.getElementById('togglePoem')) {
    const poems = [
        <p>Я помню чудное мгновенье:<br>
        Передо мной явилась ты,<br>
        Как мимолётное виденье,<br>
        Как гений чистой красоты.</p>,

        <p>У лукоморья дуб зелёный;<br>
        Златая цепь на дубе том:<br>
        И днём и ночью кот учёный<br>
        Всё ходит по цепи кругом.</p>
    ];

    let currentIndex = 0;
    const poemElement = document.getElementById('poem');
    const button = document.getElementById('togglePoem');

    button.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % poems.length;
        poemElement.innerHTML = poems[currentIndex];
    });
}

// === Визитка ===
if (document.getElementById('flipCard')) {
    const card = document.getElementById('flipCard');
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
}

// === Чат ===
if (document.getElementById('sendBtn')) {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    const addMessage = (text, isUser = false) => {
        const message = document.createElement('div');
        message.classList.add('message');
        message.classList.add(isUser ? 'user' : 'bot');
        message.textContent = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (text) {
            addMessage(text, true);
            userInput.value = '';

            setTimeout(() => {
                if (text.toLowerCase() === 'найти') {
                    addMessage('Собеседник найден! Привет, как дела?');
                } else {
                    addMessage('Я пока не умею отвечать, но слушаю...');
                }
            }, 600);
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
}

// === Парящие точки ===
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = Math.random() * 100 + 'vw';
        dot.style.top = Math.random() * 100 + 'vh';
        dot.style.animationDelay = Math.random() * 6 + 's';
        document.body.appendChild(dot);
    }
});
