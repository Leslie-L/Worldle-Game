const  tries = 6;
const amountLetters = 5;


const words = ["lapiz","cabal","traje","comer","habla"]
let word;
let numberGame = 0;

let countTries = 0;
let wordGame = [];


const keyboard = document.getElementById('keyboard');
const game = document.getElementById('game')

const keys = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l","ñ"],
  ["backspace","z","x","c","v","b","n","m","enter"]
]


function paintKeyboard() {
  word = words[numberGame].split('');
  const allKeys = keys.map(letters=>{
     const row = document.createElement('ul')
     const allRows = letters.map(letter=>{
        const col = document.createElement('li')
        const bnt = document.createElement('button')
        bnt.classList.add('button')
        if(letter==='enter'){
          bnt.addEventListener('click',()=>checkFinalWord())
          bnt.textContent='Enter';
          bnt.classList.add('button')
          bnt.classList.add('button_enter')
        }else if(letter==='backspace'){
          bnt.addEventListener('click',()=>deleteLetter())
          bnt.classList.add('button')
        }else{
          bnt.addEventListener('click',()=>paintRes(letter))
          bnt.textContent=letter;
          bnt.classList.add('button')
        }
        
        
        col.appendChild(bnt)
        return col
     })

     row.append(...allRows)
     return row
  })
  keyboard.append(...allKeys)
}
function keyIntialTries() {
  for (let i = 0; i < tries; i++) {
    const actualRow = document.createElement('ul')
    actualRow.id=`line${i}`;
    for (let j = 0; j < amountLetters; j++) {
      const col = document.createElement('li')
      actualRow.appendChild(col)
    } 
    game.append(actualRow)
  }
}
keyIntialTries()
paintKeyboard()
function paintRes(key) {
  if(wordGame.length===5)
    return;

  const  line = document.getElementById(`line${countTries}`);
  line.children[wordGame.length].textContent = key;
  wordGame.push(key);
}
function checkFinalWord() {
  if(wordGame.length!==amountLetters){
    alert('Faltan letras')
    return
  }

  const  line = document.getElementById(`line${countTries}`);
  for (let i = 0; i < amountLetters; i++) {
    const key = wordGame[i]
    if(word[i]===key.toLowerCase()){
      line.children[i].style.backgroundColor= '#79b851'
      line.children[i].style.border='none'
    }else if(word.includes(key.toLowerCase())){
      line.children[i].style.backgroundColor= '#f3c237'
      line.children[i].style.border='none'

    }else{
      line.children[i].style.backgroundColor= '#666a85'
      line.children[i].style.border='none'

    }
  }

  if(word.join('')===wordGame.join('')){
    alert('Tu ganas!')
  }else if(countTries<5){
    countTries++;
    wordGame = []
  }else if(countTries === 5){
    alert('Tu pierdes')
  }

}
function deleteLetter() {
  if(wordGame===0)
    return

  const  line = document.getElementById(`line${countTries}`);
  line.children[wordGame.length-1].textContent = '';
  wordGame.pop();
}

function checkKey(event) {
  const key = event.key
  if(key==='Enter'){
    checkFinalWord()
  }else if(key==='Backspace'){
    deleteLetter()
  }else{
    paintRes(key)
  }
}

document.addEventListener('keydown',checkKey)