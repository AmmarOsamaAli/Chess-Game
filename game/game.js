
import { getPawnMoves } from './pieceMoves.js'

/*---------------------------Cached Elemetns--------------------------------*/

//Authentication
const logInBtn = document.querySelector('#login-btn')
const signUpBtn = document.querySelector('#signup-btn')
const chessBoard = document.querySelector('.board')
const allSqaure = document.querySelectorAll('.sqr')
const whiteTimerBtn = document.querySelector('#timer-white')
const blackTimerBtn = document.querySelector('#timer-black')


/*---------------------------Constant--------------------------------*/

const pieceSVG = {

    //White Pieces 
    wP: `./game-pieces/white-pieces-normal/pawn-white-normal.svg`,
    wN: `./game-pieces/white-pieces-normal/knight-white-normal.svg`,
    wB: `./game-pieces/white-pieces-normal/bishop-white-normal.svg`,
    wR: `./game-pieces/white-pieces-normal/rook-white-normal.svg`,
    wQ: `./game-pieces/white-pieces-normal/queen-white-normal.svg`,
    wK: `./game-pieces/white-pieces-normal/king-white-normal.svg`,

    //Black Pieces 
    bP: `./game-pieces/black-pieces-normal/pawn-black-normal.svg`,
    bN: `./game-pieces/black-pieces-normal/knight-black-normal.svg`,
    bB: `./game-pieces/black-pieces-normal/bishop-black-normal.svg`,
    bR: `./game-pieces/black-pieces-normal/rook-black-normal.svg`,
    bQ: `./game-pieces/black-pieces-normal/queen-black-normal.svg`,
    bK: `./game-pieces/black-pieces-normal/king-black-normal.svg`,

}

const boardDisplay = [

    'wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR',
    'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP',
    'bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR',
]


/*---------------------------Variables--------------------------------*/

let winner = false
let loser = false
let draw = false
let check = false
let checkMate = false
let whiteTimer = 0
let blackTimer = 0
let turn = 'white'
let timer = 0
let selectedSourceIndex = null
let possibleMoves = []



/*---------------------------Functions--------------------------------*/


//Get time from URL based on choice in Get Started Page
function getTimeFromURL() {
    const URLTimer = new URLSearchParams(window.location.search)
    const timerString = URLTimer.get('time')
    const timerInMinutes = timerString.split(' ')
    timer = timerInMinutes[0] * 60
    whiteTimer = timerInMinutes[0] * 60
    blackTimer = timerInMinutes[0] * 60
}

// Display Timer 
function displayTimer() {
    const displayCountDownTimer = setTimeout(() => {
        const minutes = Math.floor(timer / 60)
        const seconds = timer % 60
        const formattedMinutes = String(minutes).padStart(2, '0')
        const formattedSeconds = String(seconds).padStart(2, '0')
        whiteTimerBtn.textContent = `${formattedMinutes}:${formattedSeconds}`
        blackTimerBtn.textContent = `${formattedMinutes}:${formattedSeconds}`
    }, 10)
}


function updateTimer() {
    const CountDownTimer = setInterval(() => {
        if (whiteTimer > 0 && turn === 'white') {
            whiteTimer -= 1
            const minutes = Math.floor(whiteTimer / 60)
            const seconds = whiteTimer % 60
            const formattedMinutes = String(minutes).padStart(2, '0')
            const formattedSeconds = String(seconds).padStart(2, '0')
            whiteTimerBtn.textContent = `${formattedMinutes}:${formattedSeconds}`
        }
        else if (blackTimer > 0 && turn === 'black') {
            blackTimer -= 1
            const minutes = Math.floor(blackTimer / 60)
            const seconds = blackTimer % 60
            const formattedMinutes = String(minutes).padStart(2, '0')
            const formattedSeconds = String(seconds).padStart(2, '0')
            blackTimerBtn.textContent = `${formattedMinutes}:${formattedSeconds}`
        }
    }, 1000)
}


// This function gets the number of each square and stores it in a variable called index.
function getSquareIndex(target) {
    let numberSplit = target.split('-')
    return Number(numberSplit[1] - 1)
}

function getPieceCode() {
    const square = event.target.closest('.sqr')
    const index = getSquareIndex(square.id)
    const pieceCode = boardDisplay[index]

    movePawn(pieceCode)
    return pieceCode
}


// This function will the move pawn 
function movePawn(pieceCode) {
    const pawnSquare = event.target.closest('.sqr')
    let pawnIndex = getSquareIndex(pawnSquare.id)
    let pawnCode = boardDisplay[pawnIndex]
    if (checkPlayerTurn(pawnCode) === false) {
        return
    }
    else{
        if (selectedSourceIndex === null) {
            if (!pawnCode) return
            selectedSourceIndex = pawnIndex
            possibleMoves = getPawnMoves(pawnIndex, pawnCode)
            return
        }
        let targetIndex = pawnIndex
        if (possibleMoves.includes(targetIndex)) {
            boardDisplay[targetIndex] = boardDisplay[selectedSourceIndex]
            boardDisplay[selectedSourceIndex] = ''
            selectedSourceIndex = null
            possibleMoves = []
            deployBoardPieces()
            swithcPlayerTurn()
        } else {
            selectedSourceIndex = null
            possibleMoves = []
        }
    }
}

function checkPlayerTurn(pieceCode) {
    let pieceCodeSplit = []
    pieceCodeSplit = pieceCode.slice(0, 1)
    if (pieceCodeSplit === 'w' && turn === 'white') {
        return true
    }
    else if (pieceCodeSplit === 'w' && turn !== 'white') {
        return false
    }
    else if (pieceCodeSplit === 'b' && turn === 'black') {
        return true
    }
    else if (pieceCodeSplit === 'b' && turn !== 'black') {
        return false
    }

}


function swithcPlayerTurn() {
    if (turn === 'white') {
        chessBoard.classList.add()
        turn = 'black'
        chessBoard.classList.add('board-flipped')
    }
    else if (turn === 'black') {
        turn = 'white'
        chessBoard.classList.remove('board-flipped')

    }
}



//This function display all the board pieces in their positions based on the boardDisplay array
function deployBoardPieces() {
    allSqaure.forEach(oneSquare => {
        const squareIndex = getSquareIndex(oneSquare.id)
        const pieceCode = boardDisplay[squareIndex]

        oneSquare.innerHTML = ''
        if (pieceCode) {
            const pieceImage = document.createElement('img')
            pieceImage.src = pieceSVG[pieceCode]
            oneSquare.appendChild(pieceImage)
        }
    })
}


function render() {
    deployBoardPieces()
    getTimeFromURL()
    displayTimer()
    updateTimer()
}



function init() {
    render()
}

init()



//Authentication
function goToLoginInPage() {
    if (event.target.id === 'login-btn')
        console.log("Login")
}

function goToSignUpPage() {
    if (event.target.id === 'signup-btn')
        console.log("Sign Up")
}

/*---------------------------Event Listeners-------------------------------*/

// To get Piece Code
allSqaure.forEach((oneSquare) => {
    oneSquare.addEventListener('click', getPieceCode)
})


//Authentication
logInBtn.addEventListener('click', goToLoginInPage)
signUpBtn.addEventListener('click', goToSignUpPage)
