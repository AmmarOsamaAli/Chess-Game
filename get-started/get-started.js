console.log('Lets Get Started')

/*---------------------------Cached Elemetns--------------------------------*/

const logInBtn = document.querySelector('#login-btn')
const signUpBtn = document.querySelector('#signup-btn')
const actualDropdown = document.querySelector('.time-control-dropdown')
const timeControlDropdown = document.querySelector('#choosen-time-control')
const dropdownArrow = document.querySelector('#dropdown-arrow')
const StartGameBtn = document.querySelector('#start-game')


console.log(StartGameBtn)
console.log(logInBtn)
console.log(signUpBtn)


/*---------------------------Functions--------------------------------*/

function goToGamePage() {
    if (event.target.id === 'start-game') {
        window.location.href = '../game/index.html'
    }
}

function DropdownFunctionality(event) {
    if (event.target.id === 'choosen-time-control') {
        if (actualDropdown.style.display = 'none') {
            actualDropdown.style.display = 'flex'
            dropdownArrow.textContent = '▲'
            console.log('Dropdown')
        }
    }
    else {
        if(actualDropdown.style.display === 'flex'){
            actualDropdown.style.display = 'none'
            dropdownArrow.textContent = '▼'
        }
    }
}

function goToLoginInPage() {
    if (event.target.id === 'login-btn')
        console.log("Login")
}

function goToSignUpPage() {
    if (event.target.id === 'signup-btn')
        console.log("Sign Up")
}

/*---------------------------Event Listeners-------------------------------*/

timeControlDropdown.addEventListener('click', DropdownFunctionality)
StartGameBtn.addEventListener('click', goToGamePage)
logInBtn.addEventListener('click', goToLoginInPage)
signUpBtn.addEventListener('click', goToSignUpPage)
