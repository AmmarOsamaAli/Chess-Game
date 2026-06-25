console.log('Lets Get Started')

/*---------------------------Cached Elemetns--------------------------------*/

const logInBtn = document.querySelector('#login-btn')
const signUpBtn = document.querySelector('#signup-btn')
const actualDropdown = document.querySelector('.time-control-dropdown')
const ChoosenTimeControl = document.querySelector('#choosen-time-control')
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
    if ((event.target.id === 'choosen-time-control' || event.target.id === 'dropdown-arrow') && dropdownArrow.textContent === '▼') {
        if(actualDropdown.style.display = 'none')
        actualDropdown.style.display = 'flex'
        dropdownArrow.textContent = '▲'
    }
    else if((event.target.id === 'choosen-time-control' || event.target.id === 'dropdown-arrow') && dropdownArrow.textContent === '▲') {
        if(actualDropdown.style.display = 'flex')
        actualDropdown.style.display = 'none'
        dropdownArrow.textContent = '▼'
        console.log('Dropdown')
    }
}

function changeTimeControl (){
    
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

ChoosenTimeControl.addEventListener('click', DropdownFunctionality)
StartGameBtn.addEventListener('click', goToGamePage)
logInBtn.addEventListener('click', goToLoginInPage)
signUpBtn.addEventListener('click', goToSignUpPage)
