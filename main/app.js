console.log('Welcome to My Chess Game')

/*---------------------------Cached Elemetns--------------------------------*/

const getStartedBtn = document.querySelector('#get-started-btn')
const logInBtn = document.querySelector('#login-btn')
const signUpBtn = document.querySelector('#signup-btn')

console.log(getStartedBtn)
console.log(logInBtn)
console.log(signUpBtn)


/*---------------------------Functions--------------------------------*/

function goToGetStartedPage (){
    if(event.target.id === 'get-started-btn'){
        window.location.href = '../get-started/index.html'
    }
}

function goToLoginInPage (){
    if(event.target.id === 'login-btn')
        console.log("Login")
}

function goToSignUpPage (){
    if(event.target.id === 'signup-btn')
        console.log("Sign Up")
}

/*---------------------------Event Listeners-------------------------------*/


getStartedBtn.addEventListener('click',goToGetStartedPage)
logInBtn.addEventListener('click',goToLoginInPage)
signUpBtn.addEventListener('click',goToSignUpPage)
