console.log('Lets Get Started')

/*---------------------------Cached Elemetns--------------------------------*/

// Authentication
const logInBtn = document.querySelector('#login-btn')
const signUpBtn = document.querySelector('#signup-btn')

//Dropdown Functionality
const actualDropdown = document.querySelector('.time-control-dropdown')
const ChoosenTimeControl = document.querySelector('#choosen-time-control')
const childDiv = ChoosenTimeControl.querySelector('child-div-of-choosen-timer-btn')
const dropdownArrow = document.querySelector('#dropdown-arrow')
const timerForGame = document.querySelectorAll('#timer-for-game')
const bulletTimer = document.querySelector('#bullet')
const blitzTimer = document.querySelector('#blitz')
const rapidTimer = document.querySelector('#rapid')


// Start Game
const StartGameBtn = document.querySelector('#start-game')


console.log(logInBtn)
console.log(signUpBtn)
console.log(actualDropdown)
console.log(ChoosenTimeControl)
console.log(dropdownArrow)
console.log(timerForGame)
console.log(bulletTimer)
console.log(blitzTimer)
console.log(rapidTimer)
console.log(StartGameBtn)
console.log(logInBtn)
console.log(signUpBtn)


/*---------------------------Constant--------------------------------*/

const allTimerControl = [
    { timer: '1 min', type: 'Bullet', emoji: '🚅' },
    { timer: '1 + 1', type: 'Bullet', emoji: '🚅' },
    { timer: '2 + 1', type: 'Bullet', emoji: '🚅' },
    { timer: '3 min', type: 'Blitz', emoji: '⚡' },
    { timer: '3 + 2', type: 'Blitz', emoji: '⚡' },
    { timer: '5 min', type: 'Blitz', emoji: '⚡' },
    { timer: '10 min', type: 'Rapid', emoji: '⏱️' },
    { timer: '10 + 5', type: 'Rapid', emoji: '⏱️' },
    { timer: '15 + 10', type: 'Rapid', emoji: '⏱️' },
]

/*---------------------------Functions--------------------------------*/


function goToGamePage() {
    if (event.target.id === 'start-game') {
        window.location.href = '../game/index.html'
    }
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



//Dropdown Functionality

function DropdownFunctionality(event) {
    if ((event.target.id === 'choosen-time-control' || event.target.id === 'dropdown-arrow') && dropdownArrow.textContent === '▼') {
        if (actualDropdown.style.display = 'none')
            actualDropdown.style.display = 'flex'
        dropdownArrow.textContent = '▲'
    }
    else if ((event.target.id === 'choosen-time-control' || event.target.id === 'dropdown-arrow') && dropdownArrow.textContent === '▲') {
        if (actualDropdown.style.display = 'flex')
            actualDropdown.style.display = 'none'
        dropdownArrow.textContent = '▼'
        console.log('Dropdown')
    }
}

function chooseTimeControl(event) {
    if (event.target.id === 'timer-for-game') {
        ChoosenTimeControl.textContent = event.target.textContent
        actualDropdown.style.display = 'none'
        dropdownArrow.textContent = '▼'
    }
}


    /*---------------------------Event Listeners-------------------------------*/


    //Drop Down Fucntionality
    ChoosenTimeControl.addEventListener('click', DropdownFunctionality)
    timerForGame.forEach(oneTimer => oneTimer.addEventListener('click', chooseTimeControl))


    //Start Game
    StartGameBtn.addEventListener('click', goToGamePage)


    // Authentication
    logInBtn.addEventListener('click', goToLoginInPage)
    signUpBtn.addEventListener('click', goToSignUpPage)
