const jwt_decode = require('jwt-decode');
const {getAllHabits} = require('./requests')



const requestSignup= async (e) => {
    e.preventDefault();
    const form = e.target
    const username = e.target.username.value
    const email = e.target.Semail.value
    const password = e.target.Spassword.value
    try {
        const postData = {
            username: username,
            email: email,
            password: password
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        }
        const res = await fetch(`http://localhost:3000/auth/register`, options)
        const data = await res.json()
        if (data.err){ throw Error(data.err) }
        instantLogin(e);
        form.reset()
    } catch (err) {
        console.warn(err);
    }
}

const instantLogin = async (e) => {
    e.preventDefault();
    const email = e.target.Semail.value
    const password = e.target.Spassword.value
    try {
        const postData = {
            email: email,
            password: password
        }
        const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
        };
        const res = await fetch(`http://localhost:3000/auth/login`, options);
        const data = await res.json();
        if (!data.success) {
        throw new Error("Login not authorised");
        }
        login(data.token);
  } catch (err) {
        console.warn(err);
  }
}

const requestLogin = async (e) => {
  e.preventDefault();
  const form = e.target
  let email = e.target.email.value 
  let password = e.target.password.value 
  try {
        const postData = {
            email: email,
            password: password
        }
        const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
        };
        const res = await fetch(`http://localhost:3000/auth/login`, options);
        const data = await res.json();
        if (!data.success) {
        throw new Error("Login not authorised");
        }
        form.reset()
        login(data.token);
  } catch (err) {
        console.warn(err);
  }
};


function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("userEmail", user.email);
    const userWelcome = document.querySelector('.habitTitle')
    userWelcome.textContent = `Welcome ${user.username} create a new habit here`
    window.location.hash = '#dashboard';
    getAllHabits()
}





module.exports = { requestLogin, requestSignup, login, instantLogin };
