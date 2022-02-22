
const publicRoutes = ['#', '#login', '#signup'];
const privateRoutes = ['#dashboard', '#profile'];

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

function updateContent(){
    const path = window.location.hash;
    if (privateRoutes.includes(path) && !currentUser()){
        window.location.hash = '#login';
    } else if (!privateRoutes.includes(path) && currentUser()) {
        window.location.hash = '#dashboard';
    } else {
        updateMain(path);
    }
}

const updateMain = (path) => {
    console.log("updating")
    if (path) {
        switch(path){
            case '#login':
                renderLoginForm(); break;
            case '#register':
                renderRegisterForm(); break;
            case '#dashboard':
                renderDash(); break;
            case '#profile':
                renderProfile(); break;
            default:
                render404(); break;
        }
    } else {
        renderHomepage();
    }
}

const renderDash = () => {
    const forms =document.querySelector('.wrapper')
    forms.style.display = 'none'
    const backGround = document.body
    backGround.style.background = 'white'
    const nav =document.querySelector('.navbar')
    nav.style.display = 'flex'
    const habitForm = document.querySelector('.habit-container')
    habitForm.style.display = 'flex'

}

module.exports = {updateContent}
