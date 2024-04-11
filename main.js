const  tries = 6;
const amountLetters = 5;


const words =  [
  "perro",
  "gatos",
  "pluma",
  "mesas",
  "luces",
  "llaves",
  "comer",
  "lapiz",
  "papel",
  "leche",
  "mango",
  "lente",
  "tigre",
  "fresa",
  "dulce",
  "monje",
  "silla",
  "cerro",
  "radio",
  "cajas"
];
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
          bnt.innerHTML=`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33" />
            </svg>
          `;
          bnt.classList.add('button')
          
        }else{
          bnt.addEventListener('click',()=>paintRes(letter))
          bnt.textContent=letter;
          bnt.classList.add('button')
        }
        bnt.id=letter
        
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
function paintRes(k) {
  const key = k.toLowerCase()
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
    const keyboarKey = document.getElementById(key); 
    console.log(keyboarKey)
    if(word[i]===key.toLowerCase()){
      line.children[i].style.backgroundColor= '#79b851'
      line.children[i].style.border='none'
      keyboarKey.style.backgroundColor= '#79b851'
    }else if(word.includes(key.toLowerCase())){
      line.children[i].style.backgroundColor= '#f3c237'
      line.children[i].style.border='none'
      keyboarKey.style.backgroundColor= '#f3c237'
    }else{
      line.children[i].style.backgroundColor= '#666a85'
      line.children[i].style.border='none'
      keyboarKey.style.backgroundColor= '#37383e'
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