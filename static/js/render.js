
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
        window.location.hash = '#login';
    } else {
        updateMain(path);
    }
}

const updateMain = (path) => {
    console.log(path)
    console.log("moving to dash")
}

module.exports = {updateContent}
