/*---------------------------Cached Elemetns--------------------------------*/

//Authentication
const logInBtn = document.querySelector('#login-btn')
const signUpBtn = document.querySelector('#signup-btn')
const chessBoard = document.querySelectorAll('.board')
const allSqaure = document.querySelectorAll('.sqr')



console.log(logInBtn)
console.log(signUpBtn)
console.log(chessBoard)

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

const startingBoard = [

    'bR', 'bB', 'bN', 'bQ', 'bK', 'bN', 'bB', 'bR',
    'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP',
    'wR', 'wB', 'wN', 'wQ', 'wK', 'wN', 'wB', 'wR',
]

/*---------------------------Variables--------------------------------*/

let index = 0
let winner = false
let loser = false
let draw = false
let check = false
let checkMate = false
let turn = 'White'
let whiteTimer
let blackTimer
let targetID = ''
let numberSplit = []

/*---------------------------Functions--------------------------------*/


// This function gets the number of each square and stores it in a variable called index.
function getNumberOfEachSquare(event) {
    targetID = event.target.id
    numberSplit = targetID.split('-')
    index = numberSplit[1]
    console.log(index)
}



function render(event) {
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


allSqaure.forEach((oneSquare) => {
    oneSquare.addEventListener('click', getNumberOfEachSquare)
})


//Authentication
logInBtn.addEventListener('click', goToLoginInPage)
signUpBtn.addEventListener('click', goToSignUpPage)
