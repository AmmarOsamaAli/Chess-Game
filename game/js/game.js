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
const promotionDropdownWhite = document.querySelector('#show-promotion-white')
const promotionDropdownBlack = document.querySelector('#show-promotion-black')
const PromotionPiece = document.querySelectorAll('.promote-piece')
const showWinnerWhite = document.querySelector('#show-winner-screen-white')
const showWinnerBlack = document.querySelector('#show-winner-screen-black')
const showDrawWhite = document.querySelector('#show-draw-screen-white')
const showDrawBlack = document.querySelector('#show-draw-screen-black')



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

// const boardDisplay = [

//     'wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR',
//     'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP',
//     '', '', '', '', '', '', '', '',
//     '', '', '', '', '', '', '', '',
//     '', '', '', '', '', '', '', '',
//     '', '', '', '', '', '', '', '',
//     'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP',
//     'bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR',
// ]

const boardDisplay = [

    'wR', '', '', 'wQ', 'wK', '', '', 'wR',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', 'bK', '', '', '',
]




/*---------------------------Variables--------------------------------*/

let winner = false
let whiteTimer = 0
let blackTimer = 0
let turn = 'white'
let timer = 0
let countDownTimer = 0
let gameOver = 0
let selectedSourceIndex = null
let promotionIndex = null
let possibleMoves = { possibleMoves: [], possibleCaptures: [] }
let chessMove = null
let moveCount = 0
let whiteKingMoved = false
let blackKingMoved = false
let whiteKingSideRookMoved = false
let whiteQueenSideRookMoved = false
let blackKingSideRookMoved = false
let blackQueenSideRookMoved = false


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
    setTimeout(() => {
        const minutes = Math.floor(timer / 60)
        const seconds = timer % 60
        const formattedMinutes = String(minutes).padStart(2, '0')
        const formattedSeconds = String(seconds).padStart(2, '0')
        whiteTimerBtn.textContent = `${formattedMinutes}:${formattedSeconds}`
        blackTimerBtn.textContent = `${formattedMinutes}:${formattedSeconds}`
    }, 1)
}


function updateTimer() {
    countDownTimer = setInterval(() => {
        if (gameOver) {
            clearInterval(countDownTimer)
            return
        }
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

        if (whiteTimer === 0) {
            endGame()
            showWinnerBlack.style.display = 'flex'
            checkForWinner()
        }
        else if (blackTimer === 0) {
            endGame()
            showWinnerWhite.style.display = 'flex'
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
    movePiece(pieceCode, event)
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
    {
        if (pieceCode === 'wK' || pieceCode === 'bK') highlightedMoves.possibleMoves.push(...getCastlingMoves(pieceIndex, pieceCode))
    }


    highlightedMoves.possibleMoves = highlightedMoves.possibleMoves.filter(index => simulateMoves(pieceIndex, index))
    highlightedMoves.possibleCaptures = highlightedMoves.possibleCaptures.filter(index => simulateMoves(pieceIndex, index))

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

// This function handles the promotion of the pawn by making the player choose the piece he want to promote to
function handlePromtion(event) {
    const pieceID = event.target.id
    const pieceMap = {
        'White-Queen': "wQ",
        'White-Bishop': "wB",
        'White-Knight': "wN",
        'White-Rook': "wR",

        'Black-Queen': "bQ",
        'Black-Bishop': "bB",
        'Black-Knight': "bN",
        'Black-Rook': "bR",
    }

    boardDisplay[promotionIndex] = pieceMap[pieceID]
    promotionDropdownWhite.style.display = "none"
    promotionDropdownBlack.style.display = "none"

    deployBoardPieces()
    switchPlayerTurn()
    checkForWinner()

    if (winner) {
        if (turn === 'white') {
            showWinnerBlack.style.display = 'flex'
            endGame()
        }
        else {
            showWinnerWhite.style.display = 'flex'
            endGame()
        }
        return
    }

    if (checkForStalemate() && !checkForCheck(boardDisplay)) {
        if (turn === 'white') {
            showDrawBlack.style.display = 'flex'
            endGame()
        }
        else {
            showDrawWhite.style.display = 'flex'
            endGame()
        }
        return
    }

    if (checkForCheck(boardDisplay) && !winner) {
        if (turn === 'white')
            playerTurnIndicator.innerHTML = '<span style="color: red">Check!</span><br> Player Turn: <span style="color: #EAEDD1">White</span>'
        else if (turn === 'black')
            playerTurnIndicator.innerHTML = '<span style="color: red">Check!</span><br> Player Turn: <span style="color: #9FD05D">Black</span>'
    }

    promotionIndex = null
}

// This function handles the castling of the king and the rook
function handleCastling(sourceIndex, targetIndex, movedPiece) {
    if (movedPiece !== 'wK' && movedPiece !== 'bK')
        return

    if (Math.abs(targetIndex - sourceIndex) !== 2) return

    if (sourceIndex === 4 && targetIndex == 6) {
        boardDisplay[5] = boardDisplay[7]
        boardDisplay[7] = ''
    }
    else if (sourceIndex === 4 && targetIndex === 2) {
        boardDisplay[3] = boardDisplay[0]
        boardDisplay[0] = ''
    }
    else if (sourceIndex === 60 && targetIndex === 62) {
        boardDisplay[61] = boardDisplay[63]
        boardDisplay[63] = ''
    }
    else if (sourceIndex === 60 && targetIndex === 58) {
        boardDisplay[59] = boardDisplay[56]
        boardDisplay[56] = ''
    }
}

function getCastlingRight(sourceIndex, movedPiece) {
    if (movedPiece === 'wK') whiteKingMoved = true
    else if (movedPiece === 'bK') blackKingMoved = true

    if (movedPiece === 'wR' && sourceIndex === 7) whiteKingSideRookMoved = true
    else if (movedPiece === 'wR' && sourceIndex === 0) whiteQueenSideRookMoved = true

    if (movedPiece === 'bR' && sourceIndex === 63) blackKingSideRookMoved = true
    else if (movedPiece === 'bR' && sourceIndex === 56) blackQueenSideRookMoved = true
}

// This function gets the castling moves to actually show on the board
function getCastlingMoves(sourceIndex, kingCode) {
    const possibleMoves = []

    if (checkForCheck(boardDisplay)) return possibleMoves

    if (sourceIndex === 4 && kingCode === 'wK') {
        if (!whiteKingMoved && !whiteKingSideRookMoved && boardDisplay[5] === '' && boardDisplay[6] === '' && boardDisplay[7] === 'wR' && simulateMoves(4, 5) && simulateMoves(4, 6))
            possibleMoves.push(6)
        if (!whiteKingMoved && !whiteQueenSideRookMoved && boardDisplay[3] === '' && boardDisplay[2] === '' && boardDisplay[1] === '' && boardDisplay[0] === 'wR' && simulateMoves(4, 2) && simulateMoves(4, 3))
            possibleMoves.push(2)
    }
    if (sourceIndex === 60 && kingCode === 'bK') {
        if (!blackKingMoved && !blackKingSideRookMoved && boardDisplay[61] === '' && boardDisplay[62] === '' && boardDisplay[63] === 'bR' && simulateMoves(60, 61) && simulateMoves(60, 62))
            possibleMoves.push(62)
        if (!blackKingMoved && !blackQueenSideRookMoved && boardDisplay[59] === '' && boardDisplay[58] === '' && boardDisplay[57] === '' && boardDisplay[56] === 'bR' && simulateMoves(60, 59) && simulateMoves(60, 58))
            possibleMoves.push(58)
    }

    return possibleMoves

}



// This function is the main function for moving all the pieces
function movePiece(movePieceCode, event) {
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

            const castleMoves = getCastlingMoves(pieceIndex, pieceCode)
            possibleMoves.possibleMoves.push(...castleMoves)

            getSquareOfPossibleMoves(pieceIndex, pieceCode)
            return
        }
    }

    let targetIndex = pieceIndex
    const allValidMoves = [...possibleMoves.possibleMoves, ...possibleMoves.possibleCaptures]
    if (allValidMoves.includes(targetIndex)) {
        if (simulateMoves(selectedSourceIndex, targetIndex) === false)
            return
        else {

            boardDisplay[targetIndex] = boardDisplay[selectedSourceIndex]
            boardDisplay[selectedSourceIndex] = ''

            const movedPiece = boardDisplay[targetIndex]

            getCastlingRight(selectedSourceIndex, movedPiece)
            handleCastling(selectedSourceIndex, targetIndex, movedPiece)



            if ((movedPiece === 'wP' && Math.floor(targetIndex / 8) === 7) ||
                (movedPiece === 'bP' && Math.floor(targetIndex / 8) === 0)) {

                promotionIndex = targetIndex

                if (movedPiece === 'wP') {
                    promotionDropdownWhite.style.display = 'flex'
                }
                else {
                    promotionDropdownBlack.style.display = 'flex'
                }

                selectedSourceIndex = null
                possibleMoves = { possibleMoves: [], possibleCaptures: [] }
                clearPossibleMoveHighlights()
                getBoardCoordinate(targetIndex)
                deployBoardPieces()

                return
            }

            selectedSourceIndex = null
            possibleMoves = { possibleMoves: [], possibleCaptures: [] }
            clearPossibleMoveHighlights()
            getBoardCoordinate(targetIndex)
            deployBoardPieces()
            switchPlayerTurn()
            checkForWinner()

            if (winner) {
                if (turn === 'white') {
                    showWinnerBlack.style.display = 'flex'
                    endGame()
                }
                else {
                    showWinnerWhite.style.display = 'flex'
                    endGame()
                }
                return
            }

            if (checkForStalemate() && !checkForCheck(boardDisplay)) {
                if (turn === 'white') {
                    showDrawBlack.style.display = 'flex'
                    endGame()
                }
                else {
                    showDrawWhite.style.display = 'flex'
                    endGame()
                }
                return
            }

            if (checkForCheck(boardDisplay)) {
                if (turn === 'white')
                    playerTurnIndicator.innerHTML = '<span style="color: red">Check!</span><br> Player Turn: <span style="color: #EAEDD1">White</span>'
                else if (turn === 'black')
                    playerTurnIndicator.innerHTML = '<span style="color: red">Check!</span><br> Player Turn: <span style="color: #9FD05D">Black</span>'
            }
        }

    } else {
        selectedSourceIndex = null
        possibleMoves = { possibleMoves: [], possibleCaptures: [] }
        clearPossibleMoveHighlights()
    }
}

// This function checks who turn is it
function checkPlayerTurn(pieceCode) {
    let pieceCodeSplit = pieceCode.slice(0, 1)
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
function switchPlayerTurn() {
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


// This function will create a copy of displayBoard, in order to check if the next move will result in a check or no
function simulateMoves(sourceIndex, targetIndex) {
    let boardCopy = []
    boardCopy = boardDisplay.slice()
    boardCopy[targetIndex] = boardCopy[sourceIndex]
    boardCopy[sourceIndex] = ''
    if (checkForCheck(boardCopy)) {
        return false
    }
    else { return true }

}


// This function checks who is the winner
function checkForWinner() {

    winner = false

    if (checkForCheckmate())
        if (turn === 'white') {
            winner = 'black'
        }
        else {
            winner = 'white'
        }
}

// This functions checks if there is a draw
function checkForStalemate() {
    let countMoves = 0
    let moves
    boardDisplay.forEach((oneSquare, index) => {
        if (oneSquare && oneSquare[0] === 'w' && turn === 'white') {
            if (oneSquare === 'wP') {
                moves = getPawnMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wN') {
                moves = getKnightMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wB') {
                moves = getBishopMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wR') {
                moves = getRookMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wQ') {
                moves = getQueenMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wK') {
                moves = getKingMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
        }
        else if (oneSquare && oneSquare[0] === 'b' && turn === 'black') {
            if (oneSquare === 'bP') {
                moves = getPawnMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bN') {
                moves = getKnightMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bB') {
                moves = getBishopMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bR') {
                moves = getRookMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bQ') {
                moves = getQueenMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bK') {
                moves = getKingMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
        }
    })

    if (countMoves === 0 && !checkForCheck(boardDisplay)) {
        return true
    }
    else { return false }
}

// This function checks if there is a check on the king
function checkForCheck(boardDisplay) {
    let kingIndex = null
    let enemyCaptures = []
    let moves = null
    boardDisplay.forEach((oneSquare, index) => {
        moves = null
        if (turn === 'white' && oneSquare === 'wK') kingIndex = index
        else if (turn === 'black' && oneSquare === 'bK') kingIndex = index
    })

    boardDisplay.forEach((oneSquare, index) => {
        if (!oneSquare) return
        if (oneSquare && oneSquare[0] === 'b' && turn === 'white') {
            if (oneSquare === 'bP') {
                moves = getPawnMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'bN') {
                moves = getKnightMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'bB') {
                moves = getBishopMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'bR') {
                moves = getRookMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'bQ') {
                moves = getQueenMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'bK') {
                moves = getKingMoves(index, oneSquare, boardDisplay)
            }
        }
        else if (oneSquare && oneSquare[0] === 'w' && turn === 'black') {
            if (oneSquare === 'wP') {
                moves = getPawnMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'wN') {
                moves = getKnightMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'wB') {
                moves = getBishopMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'wR') {
                moves = getRookMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'wQ') {
                moves = getQueenMoves(index, oneSquare, boardDisplay)
            }
            else if (oneSquare === 'wK') {
                moves = getKingMoves(index, oneSquare, boardDisplay)
            }
        }
        if (moves) {
            enemyCaptures.push(...moves.possibleCaptures)
        }
    })

    return enemyCaptures.includes(kingIndex)

}

// This function checks if there is a checkmate on the king
function checkForCheckmate() {
    if (!checkForCheck(boardDisplay))
        return false
    let countMoves = 0
    let moves
    boardDisplay.forEach((oneSquare, index) => {
        if (oneSquare && oneSquare[0] === 'w' && turn === 'white') {
            if (oneSquare === 'wP') {
                moves = getPawnMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wN') {
                moves = getKnightMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wB') {
                moves = getBishopMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wR') {
                moves = getRookMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wQ') {
                moves = getQueenMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'wK') {
                moves = getKingMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
        }
        else if (oneSquare && oneSquare[0] === 'b' && turn === 'black') {
            if (oneSquare === 'bP') {
                moves = getPawnMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bN') {
                moves = getKnightMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bB') {
                moves = getBishopMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bR') {
                moves = getRookMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bQ') {
                moves = getQueenMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
            else if (oneSquare === 'bK') {
                moves = getKingMoves(index, oneSquare, boardDisplay)
                moves.possibleMoves = moves.possibleMoves.filter(move => simulateMoves(index, move))
                moves.possibleCaptures = moves.possibleCaptures.filter(move => simulateMoves(index, move))
                countMoves += moves.possibleMoves.length + moves.possibleCaptures.length
            }
        }
    })

    if (countMoves === 0 && checkForStalemate() === false)
        return true
    else return false
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

function endGame() {
    gameOver = true
    clearInterval(countDownTimer)
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
function goToLoginInPage(event) {
    if (event.target.id === 'login-btn')
        console.log("Login")
}

function goToSignUpPage(event) {
    if (event.target.id === 'signup-btn')
        console.log("Sign Up")
}

/*---------------------------Event Listeners-------------------------------*/

// To get Piece Code
allSqaure.forEach((oneSquare) => {
    oneSquare.addEventListener('click', getPieceCode)
})

// To get Piece image for promotion
PromotionPiece.forEach(onePiece => {
    onePiece.addEventListener('click', handlePromtion)
})

//Authentication
logInBtn.addEventListener('click', goToLoginInPage)
signUpBtn.addEventListener('click', goToSignUpPage)
