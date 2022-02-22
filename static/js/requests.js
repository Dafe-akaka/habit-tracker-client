

const getAllHabits = async () => {
    try {
        const options = {
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
        }
        const res = await fetch('http://localhost:3000/habits', options);
        const data = await res.json();
        console.log(data)
        if(data.err){
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}


module.exports = {getAllHabits}
