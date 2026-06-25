/*---------------------------Cached Elemetns--------------------------------*/

//Authentication
const logInBtn = document.querySelector('#login-btn')
const signUpBtn = document.querySelector('#signup-btn')
const chessBoard = document.querySelectorAll('.board')



console.log(logInBtn)
console.log(signUpBtn)
console.log(chessBoard)

/*---------------------------Constant--------------------------------*/

const pieceSVG = {

    //White Pieces Normal
    wPN: `./game-pieces/white-pieces-normal/pawn-white-normal.svg`,
    wNN: `./game-pieces/white-pieces-normal/knight-white-normal.svg`,
    wBN: `./game-pieces/white-pieces-normal/bishop-white-normal.svg`,
    wRN: `./game-pieces/white-pieces-normal/rook-white-normal.svg`,
    wQN: `./game-pieces/white-pieces-normal/queen-white-normal.svg`,
    wKN: `./game-pieces/white-pieces-normal/king-white-normal.svg`,

    //White Pieces Reversed
    wPR: `./game-pieces/white-pieces-reversed/pawn-white-reversed.svg`,
    wNR: `./game-pieces/white-pieces-reversed/knight-white-reversed.svg`,
    wBR: `./game-pieces/white-pieces-reversed/bishop-white-reversed.svg`,
    wRR: `./game-pieces/white-pieces-reversed/rook-white-reversed.svg`,
    wQR: `./game-pieces/white-pieces-reversed/queen-white-reversed.svg`,
    wKR: `./game-pieces/white-pieces-reversed/king-white-reversed.svg`,


    //Black Pieces Normal
    bPN: `./game-pieces/black-pieces-normal/pawn-black-normal.svg`,
    bNN: `./game-pieces/black-pieces-normal/knight-black-normal.svg`,
    bBN: `./game-pieces/black-pieces-normal/bishop-black-normal.svg`,
    bRN: `./game-pieces/black-pieces-normal/rook-black-normal.svg`,
    bQN: `./game-pieces/black-pieces-normal/queen-black-normal.svg`,
    bKN: `./game-pieces/black-pieces-normal/king-black-normal.svg`,

    //Black Pieces Reversed
    bPR: `./game-pieces/black-pieces-reversed/pawn-black-reversed.svg`,
    bNR: `./game-pieces/black-pieces-reversed/knight-black-reversed.svg`,
    bBR: `./game-pieces/black-pieces-reversed/bishop-black-reversed.svg`,
    bRR: `./game-pieces/black-pieces-reversed/rook-black-reversed.svg`,
    bQR: `./game-pieces/black-pieces-reversed/queen-black-reversed.svg`,
    bKR: `./game-pieces/black-pieces-reversed/king-black-reversed.svg`,



}

const startingBoard = [

    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
]


/*---------------------------Functions--------------------------------*/


function CheckChessBoard(event) {
    console.log(event.target)
    console.log(pieceSVG)
}

function checkStartingBoard() {
    startingBoard.forEach(oneSquare => {
        console.log(oneSquare)
    })
}

checkStartingBoard()

function render() {
    
}



function init() {
    render()
}



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


chessBoard.forEach((oneColumn) => {
    oneColumn.addEventListener('click', CheckChessBoard)
})



//Authentication
logInBtn.addEventListener('click', goToLoginInPage)
signUpBtn.addEventListener('click', goToSignUpPage)
