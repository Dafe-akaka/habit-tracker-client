const {logout} = require('./render')
const {createHabit} = require('./requests')
const {requestLogin, requestSignup} = require('./auth')
const {updateContent} = require('./render')
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupForm = document.querySelector("form.signup")
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const logoutBtn = document.querySelector("#logout")
const habitForm = document.querySelector("#habitForm")

signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
   location.hash =`#signup`
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
  window.location.hash =`#login`
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

window.addEventListener('hashchange', updateContent);
loginForm.addEventListener("submit", requestLogin )
signupForm.addEventListener("submit",requestSignup)
logoutBtn.addEventListener("click", logout)
habitForm.addEventListener('submit', createHabit)
