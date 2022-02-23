const {setPosts} =  require("./render")


const getAllHabits = async () => {
    try {
        let email = localStorage.getItem('userEmail')
        console.log(email)

        // const options = {
        //     headers: new Headers({'Authorization': localStorage.getItem('token')}),
        // }
        const res = await fetch(`http://localhost:3000/habits/habits/3/test88`);
        const data = await res.json();
        console.log(data)
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
    let username = localStorage.getItem('username')
    let frequncy = e.target.frequency.value
    let habit = e.target.habit.value
    console.log(frequncy,habit)
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
        console.log(data)
        if(data.err){
            console.warn(data.err);
            logout();
        }
        console.log("the new updated habit",getAllHabits())

        return data;
    } catch (err) {
        console.warn(err);
    }
}




module.exports = {getAllHabits, createHabit}
