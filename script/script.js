const hangManImg = document.querySelector('.hangman-box img')
const keyBoardDiv = document.querySelector('.keyboard'); // tampilkan tombol di kelas keyboard
const wordDisplay = document.querySelector('.word-display')// tampilkan garis bwah untuk kata
const guessedText = document.querySelector('.guesses-text')// tampilkan garis bwah untuk kata
const gameModal = document.querySelector('.game-modal')// menambahkan class show dan menampilkan game modal
const playAgainBtn = document.querySelector('.play-again ')
let currentWorld, correctLetter, wrongGuestCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetter =[ ]
    wrongGuestCount = 0
    wordDisplay.innerHTML = currentWorld.split('').map(()=>`<li class="letter"></li>`).join('');
    gameModal.classList.remove("show")
    keyBoardDiv.querySelectorAll('button').forEach(btn => btn.disabled =false)
    hangManImg.src = `images/images/hangman-${wrongGuestCount}.svg`
    guessedText.innerText=`${wrongGuestCount} / ${maxGuesses}`;
}

const gameOver = (isVictory)=>{
    setTimeout(() => {
        const modalText = isVictory ? 'you found word: ' : 'the correct word was: ';
        gameModal.querySelector('img').src = `images/images/${isVictory?'victory':'lost'}.gif`;
        gameModal.querySelector('h4').innerText = `${isVictory?'Congrast!':'Game Over'}`;
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWorld}</b>`;
        gameModal.classList.add("show")
    }, 300);
}

const getRandomWord = () =>{
    //method randam word and hint
    const { hint, word } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWorld = word;
    console.log(word);    
    document.querySelector('.hint-text b').innerHTML = hint;    
    resetGame();    
}
const initGame = (button,clickedLetter)=>{
    //checkin if clickedLetter exist word
   if(currentWorld.includes(clickedLetter)){
    [...currentWorld].forEach((letter,index)=>{
        if(letter===clickedLetter){
            correctLetter.push(letter)
            wordDisplay.querySelectorAll('li')[index].innerText = letter;
            wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
            console.log(index);
        }    
    })
   }else{
    // if clicked letter no exist then update the wrongGuestCount and hangman Image
    wrongGuestCount ++;
    hangManImg.src = `images/images/hangman-${wrongGuestCount}.svg`
   }
   button.disabled = true;
   guessedText.innerText=`${wrongGuestCount} / ${maxGuesses}`;
   //calling game over function if any of these codition meets
   if(wrongGuestCount === maxGuesses) return gameOver(false);
   if( correctLetter.length === currentWorld.length) return gameOver(true);

}


//create button  and add event listener
for (let i = 97; i <= 122; i++) {        
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyBoardDiv.appendChild(button);
    button.addEventListener("click",e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord)