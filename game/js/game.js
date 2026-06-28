import { getPawnMoves } from './pieceMoves.js'
import { getRookMoves } from './pieceMoves.js'
import { getKnightMoves } from './pieceMoves.js'
import { getBishopMoves } from './pieceMoves.js'
import { getQueenMoves } from './pieceMoves.js'
import { getKingMoves } from './pieceMoves.js'



/*---------------------------Cached Elemetns--------------------------------*/

//Authentication
const logInBtn = document.querySelector('#login-btn')
const signUpBtn = document.querySelector('#signup-btn')
const chessBoard = document.querySelector('.board')
const allSqaure = document.querySelectorAll('.sqr')
const whiteTimerBtn = document.querySelector('#timer-white')
const blackTimerBtn = document.querySelector('#timer-black')
const playerTurnIndicator = document.querySelector('#player-turn-indicator')
const moveHistory = document.querySelector('#move-history')

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
let draw = false
let check = false
let whiteTimer = 0
let blackTimer = 0
let turn = 'white'
let timer = 0
let selectedSourceIndex = null
let possibleMoves = { possibleMoves: [], possibleCaptures: [] }
let chessMove = null
let moveCount = 0



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
    }, 1)
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
        else if (whiteTimer === 0 || blackTimer === 0) {
            clearInterval(countDownTimer)
            checkForWinner()
        }
    }, 1000)
}


// This function gets the number of each square and stores it in a variable called index.
function getSquareIndex(target) {
    let numberSplit = target.split('-')
    return Number(numberSplit[1] - 1)
}

// This function get the piece code
function getPieceCode() {
    const square = event.target.closest('.sqr')
    const index = getSquareIndex(square.id)
    const pieceCode = boardDisplay[index]
    movePiece(pieceCode)
}

// This function gets the Code in chess terms like e4, or b6
function getBoardCoordinate(codeOfIndex) {
    const rank = Math.floor(codeOfIndex / 8) + 1
    let file = (codeOfIndex % 8) + 1

    if (file === 1) { file = 'A' }
    else if (file === 2) { file = 'B' }
    else if (file === 3) { file = 'C' }
    else if (file === 4) { file = 'D' }
    else if (file === 5) { file = 'E' }
    else if (file === 6) { file = 'F' }
    else if (file === 7) { file = 'G' }
    else if (file === 8) { file = 'H' }

    moveCount++
    const moveEntry = document.createElement('p')
    moveEntry.textContent = `${moveCount}. ${file}${rank}`
    chessMove = moveEntry
    moveHistory.appendChild(moveEntry)
    moveHistory.scrollTop = moveHistory.scrollHeight
}

// This function clears the possible moves highlights
function clearPossibleMoveHighlights() {
    document.querySelectorAll('.move-dot').forEach(dot => dot.remove())
    document.querySelectorAll('.capture-circle').forEach(dot => dot.remove())

}

// This function highlights all the possible square that the piece can move
function getSquareOfPossibleMoves(pieceIndex, pieceCode) {
    clearPossibleMoveHighlights()
    let highlightedMoves = { possibleMoves: [], possibleCaptures: [] }
    if (pieceCode === 'wP' || pieceCode === 'bP') highlightedMoves = getPawnMoves(pieceIndex, pieceCode, boardDisplay)
    else if (pieceCode === 'wR' || pieceCode === 'bR') highlightedMoves = getRookMoves(pieceIndex, pieceCode, boardDisplay)
    else if (pieceCode === 'wN' || pieceCode === 'bN') highlightedMoves = getKnightMoves(pieceIndex, pieceCode, boardDisplay)
    else if (pieceCode === 'wB' || pieceCode === 'bB') highlightedMoves = getBishopMoves(pieceIndex, pieceCode, boardDisplay)
    else if (pieceCode === 'wQ' || pieceCode === 'bQ') highlightedMoves = getQueenMoves(pieceIndex, pieceCode, boardDisplay)
    else if (pieceCode === 'wK' || pieceCode === 'bK') highlightedMoves = getKingMoves(pieceIndex, pieceCode, boardDisplay)

    for (let oneSquareMove of highlightedMoves.possibleMoves) {
        const oneSquare = document.getElementById(`sqr-${oneSquareMove + 1}`)
        if (!oneSquare) continue
        const dot = document.createElement('div')
        dot.classList.add('move-dot')
        oneSquare.appendChild(dot)
    }

    for (let oneSquareCapture of highlightedMoves.possibleCaptures) {
        const oneSquare = document.getElementById(`sqr-${oneSquareCapture + 1}`)
        if (!oneSquare) continue
        const dot = document.createElement('div')
        dot.classList.add('capture-circle')
        oneSquare.appendChild(dot)
    }
}

// This function is the main function for moving all the pieces
function movePiece(movePieceCode) {
    const pieceSquare = event.target.closest('.sqr')
    let pieceIndex = getSquareIndex(pieceSquare.id)
    let pieceCode = boardDisplay[pieceIndex]

    if (selectedSourceIndex !== null && pieceCode && checkPlayerTurn(pieceCode)) {
        selectedSourceIndex = null
        possibleMoves = { possibleMoves: [], possibleCaptures: [] }
        clearPossibleMoveHighlights()
    }
    if (selectedSourceIndex === null) {
        if (checkPlayerTurn(pieceCode) === false) return
        if (!pieceCode) {
            clearPossibleMoveHighlights()
            return
        }
        if (movePieceCode === 'wP' || movePieceCode === 'bP') {
            selectedSourceIndex = pieceIndex
            possibleMoves = getPawnMoves(pieceIndex, pieceCode, boardDisplay)
            getSquareOfPossibleMoves(pieceIndex, pieceCode)
            return
        }
        else if (movePieceCode === 'wR' || movePieceCode === 'bR') {
            selectedSourceIndex = pieceIndex
            possibleMoves = getRookMoves(pieceIndex, pieceCode, boardDisplay)
            getSquareOfPossibleMoves(pieceIndex, pieceCode)
            return
        }
        else if (movePieceCode === 'wN' || movePieceCode === 'bN') {
            selectedSourceIndex = pieceIndex
            possibleMoves = getKnightMoves(pieceIndex, pieceCode, boardDisplay)
            getSquareOfPossibleMoves(pieceIndex, pieceCode)
            return
        }
        else if (movePieceCode === 'wB' || movePieceCode === 'bB') {
            selectedSourceIndex = pieceIndex
            possibleMoves = getBishopMoves(pieceIndex, pieceCode, boardDisplay)
            getSquareOfPossibleMoves(pieceIndex, pieceCode)
            return
        }
        else if (movePieceCode === 'wQ' || movePieceCode === 'bQ') {
            selectedSourceIndex = pieceIndex
            possibleMoves = getQueenMoves(pieceIndex, pieceCode, boardDisplay)
            getSquareOfPossibleMoves(pieceIndex, pieceCode)
            return
        }
        else if (movePieceCode === 'wK' || movePieceCode === 'bK') {
            selectedSourceIndex = pieceIndex
            possibleMoves = getKingMoves(pieceIndex, pieceCode, boardDisplay)
            getSquareOfPossibleMoves(pieceIndex, pieceCode)
            return
        }
    }

    let targetIndex = pieceIndex
    const allValidMoves = [...possibleMoves.possibleMoves, ...possibleMoves.possibleCaptures]
    if (allValidMoves.includes(targetIndex)) {
        boardDisplay[targetIndex] = boardDisplay[selectedSourceIndex]
        boardDisplay[selectedSourceIndex] = ''
        selectedSourceIndex = null
        possibleMoves = { possibleMoves: [], possibleCaptures: [] }
        clearPossibleMoveHighlights()
        getBoardCoordinate(targetIndex)
        deployBoardPieces()
        swithcPlayerTurn()

    } else {
        selectedSourceIndex = null
        possibleMoves = { possibleMoves: [], possibleCaptures: [] }
        clearPossibleMoveHighlights()
    }
}

// This function checks who turn is it
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

// This function switches the player turn
function swithcPlayerTurn() {
    if (turn === 'white') {
        turn = 'black'
        chessBoard.classList.add('board-flipped')
        playerTurnIndicator.innerHTML = 'Player Turn: <span style="color: #9FD05D">Black</span>'
        chessMove.classList.add('white-move')

    }
    else if (turn === 'black') {
        turn = 'white'
        chessBoard.classList.remove('board-flipped')
        playerTurnIndicator.innerHTML = 'Player Turn: <span style="color: #EAEDD1">White</span>'
        chessMove.classList.add('black-move')
    }
}


// This function checks who is the winner
function checkForWinner() {
    if (checkForCheckmate())
        if (turn === 'white')
            winner = 'black'
        else
            winner = 'white'
}

// This functions checks if there is a draw
function checkForStalemate() {
    let countMoves = 0
    boardDisplay.forEach((oneSquare, index) => {
        if (oneSquare[0] === 'w' && turn === 'white') {
            if (oneSquare === 'wP') {
                const moves = getPawnMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wN') {
                const moves = getKnightMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wB') {
                const moves = getBishopMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wR') {
                const moves = getRookMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wQ') {
                const moves = getQueenMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wK') {
                const moves = getKingMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
        }
        else if (oneSquare[0] === 'b' && turn === 'black') {
            if (oneSquare === 'bP') {
                const moves = getPawnMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bN') {
                const moves = getKnightMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bB') {
                const moves = getBishopMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bR') {
                const moves = getRookMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bQ') {
                const moves = getQueenMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bK') {
                const moves = getKingMoves(index, oneSquare, boardDisplay)
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
        }
    })

    if (countMoves === 0) return true
    else { return false }
}

// This function checks if there is a check on the king
function checkForCheck() {

}

// This function checks if there is a checkmate on the king
function checkForCheckmate() {

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
    playerTurnIndicator.innerHTML = 'Player Turn: <span style="color: #EAEDD1">White</span>'

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
