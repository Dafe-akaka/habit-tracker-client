
const publicRoutes = ['#', '#login', '#signup'];
const privateRoutes = ['#dashboard', '#profile'];

function logout(){
    localStorage.clear();
    window.location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

function updateContent(){
    const path = window.location.hash;
    if (privateRoutes.includes(path) && !currentUser()){
        updateMain('#login');
    } else if (!privateRoutes.includes(path) && currentUser()) {
        updateMain('#login')
    } else {
        updateMain(path);
    }
}

const updateMain = (path) => {
    console.log("updating")
    if (path) {
        switch(path){
            case '#login':
                renderRegisterForm(); break;
            case '#dashboard':
                renderDash(); break;
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

const renderRegisterForm = () => {
    logout()
    const refresh = location.reload()
    return refresh
}

module.exports = {updateContent}
