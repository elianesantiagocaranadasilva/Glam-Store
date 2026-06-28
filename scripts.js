const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const items = document.querySelectorAll('.item')
const dots = document.querySelectorAll('.dot')
const numberIndicator = document.querySelector('.numbers')
const cursorSimulator = document.getElementById('cursor-simulator')

let active = 0;
const total = items.length;
let timer;

function simularMouseEmBotao(botao, tempoEspera = 0) {
    setTimeout(() => {
        if (!botao || !cursorSimulator) return;

        const rect = botao.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;

        cursorSimulator.style.opacity = '1';
        cursorSimulator.style.left = `${x}px`;
        cursorSimulator.style.top = `${y}px`;

        botao.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        botao.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

        setTimeout(() => {
            cursorSimulator.classList.add('mouse-clicando');
            botao.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            botao.click();
            botao.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            botao.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            setTimeout(() => {
                cursorSimulator.classList.remove('mouse-clicando');
                cursorSimulator.style.opacity = '0';
            }, 300);
        }, 700);
    }, tempoEspera);
}

function iniciarAutomacaoMouse() {
    simularMouseEmBotao(prevButton, 3000);
    simularMouseEmBotao(nextButton, 7000);
    simularMouseEmBotao(prevButton, 11000);
}

iniciarAutomacaoMouse();

function update(direction) {

    document.querySelector('.item.active').classList.remove('active')
    document.querySelector('.dot.active').classList.remove('active')

    if(direction > 0) {
        active = active + 1

        if(active === total) {
            active = 0
        }

    }

    else if(direction < 0) {
        active = active -1

        if(active < 0) {
            active = total - 1
        }

    }

    items[active].classList.add('active')
    dots[active].classList.add('active')

    numberIndicator.textContent = String(active + 1).padStart(2,'0')
}

prevButton.addEventListener('click', () => {
    update("-1")
})

nextButton.addEventListener('click', () => {
    update("1")
})

clearInterval(timer)
timer = setInterval(() => {
    update(1)
}, 18000);