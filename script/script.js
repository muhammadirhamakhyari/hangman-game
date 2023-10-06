const keyBoardDiv = document.querySelector('.keyboard');
const wordDisplay = document.querySelector('.word-display')

const getRandomWord = () =>{
    const { hint, word } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    document.querySelector('.hint-text b').innerHTML = hint;
    wordDisplay.innerHTML = word.split('').map(()=>`<li class="letter"></li>`).join('');    
}

//create button 
for (let i = 97; i <= 122; i++) {        
    const button = document.createElement('button');
    button.textContent = String.fromCharCode(i);
    keyBoardDiv.appendChild(button);
}

getRandomWord();
console.log(Math.random());


