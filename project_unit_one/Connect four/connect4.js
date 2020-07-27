console.log('hiiii')
const gameBoard = document.querySelector('.board')
const tableRow = document.querySelector('.board')
const tableCell = document.querySelectorAll('td')
let player1 = document.querySelector('.color1')
let player2 = document.querySelector('.color2')
const playerTurn = document.querySelector('.player-turn')

for (let i = 0; i < tableCell.length; i++) {
    tableCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
    })
}
/*function startgame () {
    if('click' === '.game') {
         prompt('welcome player one. Enter your name, you will be blue color')
     }
     
     if(!player2) {
        let player1 = prompt('welcome player two. Enter your name, you will be red color')
     }
     let currentPlayer = 1
     playerTurn.textContent = `${player1}'s turn`
     
}
startGame()*/
function startGame() {
    const start = document.querySelector('button')
    while(!player1) {
        let player1 =  prompt('welcome playerOne: enter your name')
    }
    while(!player2) {
        let player2 = prompt('welcome player two: enter your name')
    }
    let currentPlayer = 1
    playerTurn.textContent = `${player1}'s turn`

}
startGame()