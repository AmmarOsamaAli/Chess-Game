/*---------------------------Cached Elemetns--------------------------------*/

// Authentication
const logInBtn = document.querySelector('#login-btn')
const signUpBtn = document.querySelector('#signup-btn')

//Dropdown Functionality
const actualDropdown = document.querySelector('.time-control-dropdown')
const ChoosenTimeControl = document.querySelector('#choosen-time-control')
const dropdownArrow = document.querySelector('#dropdown-arrow')
const timerForGame = document.querySelectorAll('#timer-for-game')

// Start Game
const StartGameBtn = document.querySelector('#start-game')


/*---------------------------Functions--------------------------------*/


function goToGamePage(event) {
    if (event.currentTarget.id === 'start-game') {
        const selectedTime = encodeURIComponent(ChoosenTimeControl.textContent.trim())
        window.location.href = `../game/index.html?time=${selectedTime}`
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
        if (actualDropdown.style.display = 'none') {
            actualDropdown.style.display = 'flex'
            dropdownArrow.textContent = '▲'
        }
    }
    else if ((event.target.id === 'choosen-time-control' || event.target.id === 'dropdown-arrow') && dropdownArrow.textContent === '▲') {
        if (actualDropdown.style.display = 'flex') {
            actualDropdown.style.display = 'none'
            dropdownArrow.textContent = '▼'
        }
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
