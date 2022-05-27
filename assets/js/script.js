const home = document.getElementById('home');
const homeAdd = document.getElementById('home-add-word');
const homeGame = document.getElementById('home-game');
const playGame = document.getElementById('btn-start');
const btnAddWord = document.getElementById('btn-add-word');
const saveWordBtn = document.getElementById('save-word');
const btnCancel = document.getElementById('cancel');
const addedWord = document.getElementById('input-word');
const addedTip = document.getElementById('input-tip');
const giveUpBtn = document.getElementById('give-up');
const newGameBtn = document.getElementById('new-game');
const mainBoard = document.getElementById('board');
const mainWords = document.getElementById('main-word');
const hearts = document.getElementById('hearts');
const winCard = document.getElementById('win-card');
const lossCard = document.getElementById('loss-card');
const tip = document.getElementById('tip');
const disabledWord = document.getElementById('disabled-word');
const mobileBoard = document.getElementById('mobile-board')

let lossCount = 0;
let winCount = 0;
let wordBackup = '';
let keyPressed = [];
let randomId = 0;
let previousId = 0;


btnAddWord.addEventListener('click', () => {
    pageTo(home, homeAdd, 'flex');
})

btnCancel.addEventListener('click', () => {
    pageTo(homeAdd, home, 'flex');
})

playGame.addEventListener('click', () => {
    pageTo(home, homeGame, 'flex');
    if(document.body.clientWidth > 1080) {
        createBoard();
    }else {
        createBoardMobile();
    }
})

giveUpBtn.addEventListener('click', () => {
    pageTo(homeGame, home, 'flex');
    document.removeEventListener('keydown', keyDownGame);
    winCard.style.display = 'none';
    lossCard.style.display = 'none';
})

newGameBtn.addEventListener('click', () => {
    if(document.body.clientWidth > 1080) {
        createBoard();
    }else {
        createBoardMobile();
    }
})




const words = ['PEIXE', 'PUNHO', 'PROJETIL', 'PALITO', 'ELEFANTE', 'MILHO', 'RECIPIENTE', 'ADESIVO', 'NICOTINA', 'MINHOCA']

const tips = ['ANIMAL', 'PARTE DO CORPO', 'ARMA DE FOGO', 'OBJETO', 'ANIMAL', 'ALIMENTO', 'OBJETO', 'COLA', 'SUBSTANCIA', 'ANIMAL']




saveWordBtn.addEventListener('click', () => {
    const wordToArray = addedWord.value.toUpperCase().normalize('NFD').replace(/[^a-zA-Z/s]/g, '');
    const tipToArray = addedTip.value.toUpperCase().normalize('NFD').replace(/[^a-zA-Z\s]/g, '');
    if(addedWord.value === '' || addedTip.value === '') {
        alert('Os valores não podem ser em branco!!')
    }else if(words.includes(wordToArray)) {
        alert('Já possuimos esta palavra, por favor escolha outra!')
    }else{
        words.push(wordToArray);
        tips.push(tipToArray);
        addedWord.value = 'Adicionado com sucesso!!'
        addedTip.value = 'Adicionado com Sucesso!!'
        setTimeout(() => {
            addedWord.value = '';
            addedTip.value = '';
        }, 1500)
    }
})


function pageTo(pageFrom, pageTo, display) {
    pageFrom.style.animation = 'fadeOut .3s';
    setTimeout(() => {
        pageFrom.style.display = 'none';
        pageTo.style.display = display;
    }, 250)
    pageTo.style.animation = 'fadeIn .3s'
}

function keyDownGame(e) {
    const wordLength = document.querySelectorAll('.game-words div').length;
    if(e.keyCode >= 65 && e.keyCode <= 90 && !keyPressed.includes(e.key)) {
        keyPressed.push(e.key);
        if(wordBackup.includes(e.key.toUpperCase())) {
            for(let i = 0; i < wordLength; i++){
                if(e.key.toUpperCase() === mainWords.children[i].children[0].textContent) {
                    mainWords.children[i].children[0].style.display = 'block';
                    winCount++;
                }
            }
            if(winCount === wordBackup.length) {
                win();
            }
        }else {
            disabledWord.innerHTML += `<div class="disabled"><p>${e.key.toUpperCase()}</p></div>`;
            lossCount++;
            heartLoss(lossCount);
        }
    }
}

function keyDownMobile(e) {
    const wordLength = document.querySelectorAll('.game-words div').length;
    const buttonKeyboard = e.target;
    console.log(buttonKeyboard)
    if(!keyPressed.includes(buttonKeyboard.textContent) && buttonKeyboard.classList.contains('key')) {
        keyPressed.push(buttonKeyboard.textContent);
        if(wordBackup.includes(buttonKeyboard.textContent.toUpperCase())) {
            for(let i = 0; i < wordLength; i++) {
                if(buttonKeyboard.textContent.toUpperCase() === mainWords.children[i].children[0].textContent) {
                    mainWords.children[i].children[0].style.display = 'block';
                    winCount++
                }
            }
            buttonKeyboard.classList.remove('key');
            buttonKeyboard.classList.add('inactive-key');
            if(winCount === wordBackup.length) {
                win();
            }
        }else {
            buttonKeyboard.classList.remove('key');
            buttonKeyboard.classList.add('inactive-key');
            disabledWord.innerHTML += `<div class="disabled"><p>${buttonKeyboard.children[0].textContent}</p></div>`;
            lossCount++;
            heartLoss(lossCount);
        }
    }
}


function createBoard() {
    document.addEventListener('keydown', keyDownGame);
    for(let i = 0; i < 6; i++) {
        hearts.children[i].children[0].src = './assets/images/icons/coracao.png'
    }
    hearts.style.display = 'flex';
    hearts.style.animation = 'none';
    lossCount = 0;
    winCount = 0;
    keyPressed = [];
    winCard.style.display = 'none';
    lossCard.style.display = 'none';
    tip.style.display = 'flex';

    while(randomId === previousId) {
        randomId = Math.floor(Math.random() * words.length);
    }
    previousId = randomId;
    tip.textContent = tips[randomId]

    let newWord = words[randomId];
    wordBackup = words[randomId];
    newWord = newWord.split('');
    mainWords.innerHTML = '';
    for(let i = 0; i < newWord.length; i++) {
        mainWords.innerHTML += `<div class="word"><p>${newWord[i]}</p></div>`
    }
    disabledWord.innerHTML = '';
}

function createBoardMobile() {
    document.querySelectorAll('#mobile-board div').forEach(e => {
        if(e.classList.contains('inactive-key')){
            e.classList.remove('inactive-key');
            e.classList.add('key');
        }
    });
    mobileBoard.addEventListener('click', keyDownMobile);
    hearts.style.display = 'flex';
    hearts.style.animation = 'none';
    for(let i = 0; i < 6; i++) {
        hearts.children[i].children[0].src = './assets/images/icons/coracao.png';
    }
    lossCount = 0;
    winCount = 0;
    keyPressed = [];
    winCard.style.display = 'none';
    lossCard.style.display = 'none';
    tip.style.display = 'flex';

    while(randomId === previousId) {
        randomId = Math.floor(Math.random() * words.length);
    }
    previousId = randomId;
    tip.textContent = tips[randomId];
    let newWord = words[randomId];
    wordBackup = words[randomId];
    newWord = newWord.split('');
    mainWords.innerHTML = '';
    for(let i = 0; i < newWord.length; i++) {
        mainWords.innerHTML += `<div class="word"><p>${newWord[i]}</p></div>`
    }
    disabledWord.innerHTML = '';
}
console.log(document.querySelectorAll('#mobile-board div'))

function heartLoss(points) {
    switch(points){
        case 1:
            hearts.children[5].children[0].src = './assets/images/icons/heart-lucas.gif';
            break;
        case 2:
            hearts.children[4].children[0].src = './assets/images/icons/heart-lucas-2.gif';
            break;
        case 3:
            hearts.children[3].children[0].src = './assets/images/icons/heart-lucas-3.gif';
            break;
        case 4:
            hearts.children[2].children[0].src = './assets/images/icons/heart-lucas-4.gif';
            break;
        case 5:
            hearts.children[1].children[0].src = './assets/images/icons/heart-lucas-5.gif';
            break;
        case 6:
            hearts.children[0].children[0].src = './assets/images/icons/heart-lucas-6.gif';
            lost();
            break;
    }
}

function win() {
    hearts.style.animation = 'fadeOut 1s';
    setTimeout(() => {
        hearts.style.display = 'none';
    }, 950)
    winCard.style.display = 'block';
    document.removeEventListener('keydown', keyDownGame);
    document.removeEventListener('click', keyDownGameMobile);
}

function lost() {
    hearts.style.animation = 'fadeOut 1s';
    setTimeout(() => {
        hearts.style.display = 'none';
    }, 950)
    lossCard.style.display = 'block';
    document.removeEventListener('keydown', keyDownGame);
    document.removeEventListener('click', keyDownGameMobile);
}