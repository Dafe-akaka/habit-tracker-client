const jwt_decode = require('jwt-decode');


const requestSignup= async (e) => {
    e.preventDefault();
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
        console.log('user created')
        requestLogin(e);
        form.reset()
    } catch (err) {
        console.warn(err);
    }
}

const requestLogin = async (e) => {
  e.preventDefault();
  console.log(e.target)
  const email =  e.target.Semail.value || e.target.email.value
  const password =  e.target.Spassword.value || e.target.password.value
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
    window.location.hash = '#dashboard';
}

function logout(){
    localStorage.clear();
    window.location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

module.exports = { requestLogin, requestSignup, login, logout, currentUser };
