const keyBoardDiv = document.querySelector('.keyboard'); // tampilkan tombol di kelas keyboard
const wordDisplay = document.querySelector('.word-display')// tampilkan garis bwah untuk kata
let currentWorld;

const getRandomWord = () =>{
    const { hint, word } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWorld = word;
    console.log(word);
    document.querySelector('.hint-text b').innerHTML = hint;
    wordDisplay.innerHTML = word.split('').map(()=>`<li class="letter"></li>`).join('');    
}
const initGame = (button,clickedLetter)=>{
    //checkin if clickedLetter exist word
   if(currentWorld.includes(clickedLetter)){
    [...currentWorld].forEach((letter,index)=>{
        if(letter===clickedLetter){
            wordDisplay.querySelectorAll('li')[index].innerText = letter;
            wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
            console.log(index);
        }    
    })
   }else{
    console.log(clickedLetter,"is no exist in the word!")
   }
}


//create button  and add event listener
for (let i = 97; i <= 122; i++) {        
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyBoardDiv.appendChild(button);
    button.addEventListener("click",e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();