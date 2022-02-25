const {setPosts} =  require("./render")


const getAllHabits = async () => {
    try {
        let email = localStorage.getItem('userEmail')
        console.log(email)
        let username = localStorage.getItem('username')

        // const options = {
        //     headers: new Headers({'Authorization': localStorage.getItem('token')}),
        // }
        const res = await fetch(`http://localhost:3000/habits/habits/6/${username}`);
        const data = await res.json();
        if(data.err){
            console.warn(data.err);
            logout();
        }
        setPosts(data)
    } catch (err) {
        console.warn(err);
    }

}



const createHabit = async (e) => {
    e.preventDefault();
    const form = e.target
    let username = localStorage.getItem('username')
    let frequncy = e.target.frequency.value
    let habit = e.target.habit.value
    let feed = document.querySelector('#habits')
    try {
        const habitData = {
            habit: habit,
            frequency: frequncy,
        }
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(habitData)
        }
        const res = await fetch(`http://localhost:3000/habits/${username}`, options);
        const data = await res.json();
        if(data.err){
            console.warn(data.err);
            logout();
        }
        feed.innerHTML = ""
        form.reset()
        //console.log("the new updated habit",getAllHabits())
        return data;
    } catch (err) {
        console.warn(err);
    }
}






module.exports = {getAllHabits, createHabit}
