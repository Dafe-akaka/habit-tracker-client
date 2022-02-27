const Chart = require('chart.js');
const dayjs = require('dayjs')

const privateRoutes = ["#dashboard", "#profile"];

function logout() {
  localStorage.clear();
  location.hash = "#logout";
}

const renderHabitPost = (data) => {
  //create two card
  const card = document.createElement("div");
  card.classList.add("details");

  const streakCard = renderStreaks(data);

  //create & add title
  const title = document.createElement("h1");
  title.textContent = data.habitdescription;
  card.appendChild(title);

  console.log(data.currentfrequency, data.frequency);
  let value = Math.round((data.currentfrequency / data.frequency) * 100);

  const progress = document.createElement("div");
  const habitCount = document.createElement("div")
  const countText = document.createElement("p")
  countText.innerText = `${data.currentfrequency } out of ${data.frequency}`
  habitCount.appendChild(countText)

  progress.classList.add("progress");

  //create progress_fill
  const progressFill = document.createElement("div");
  progressFill.classList.add("progress__fill");
  progressFill.style.width = `${value}%`;

  // add text to fill
  const progress__text = document.createElement("span");
  progress__text.classList.add("progress__text");
  progress__text.textContent = `${value}%`;
  progressFill.appendChild(progress__text);
  progress.appendChild(progressFill);

  //create progress bar
  card.appendChild(progress);
  card.appendChild(habitCount)

  ///add buttons to card  (+, edit, delete)
  const controls = document.createElement("div");
  controls.classList.add("control");
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("btn");

  const graphBtn = document.createElement("button");
  graphBtn.classList.add("btn");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn");

  //add span inside buttons
  const update = document.createElement("span");
  update.id = data.habit_id;
  update.innerText = "+";
  updateBtn.appendChild(update);

  const graph = document.createElement("span");
  graph.id = data.habit_id;
  graph.innerText = "graph";
  graphBtn.appendChild(graph);

  const del = document.createElement("span");
  del.id = data.habit_id;
  del.innerText = "delete";
  deleteBtn.appendChild(del);

  controls.appendChild(updateBtn);
  controls.appendChild(graphBtn);
  controls.appendChild(deleteBtn);

  const box = document.createElement("div");
  box.classList.add("container");
  box.appendChild(card);
  box.appendChild(streakCard);

  const habitContainer = document.createElement("div");
  habitContainer.classList.add("posts-container");
  habitContainer.appendChild(box);

  const wrapper = document.querySelector("#habits");
  wrapper.appendChild(habitContainer);

  card.appendChild(controls);
  updateBtn.addEventListener("click", updateHabit);
  deleteBtn.addEventListener("click", deleteHabit)
  graphBtn.addEventListener("click", renderGraph)
};

const setData = async (object, axis) => {
  let obj = await object

  const xLabel = () => {
    let arr = []
    for (const value of obj) {
      console.log("this is what the date is", value)
      const formatDate = dayjs(value).format('DD/MM/YYYY')
      arr.unshift(formatDate)
    } 
    return arr
  }

  const yLabel = () => {
    let arr = []
    for (const value of obj) {
      arr.unshift(value)
    } 
    return arr
  }  

    let data = axis === "y" ? yLabel() : xLabel() 
  return data

}

const getGraphData = async (habit_id) => {
  try {
    const res = await fetch(`http://localhost:3000/habits/graphdata/${habit_id}`);
    const data = await res.json();
    if(data.err){
        console.warn(data.err);
        logout();
    }
    return data
} catch (err) {
    console.warn(err);
}
}


const modalEvent = () => {
  const modal = document.querySelector(".modal");
    const closeModal = document.querySelector(".close");
    modal.style.display = "block";
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
    return true
}



const renderGraph = async (e) => {
  const id = e.target.id
  console.log(id)
  modalEvent()
  let obj = await getGraphData(id)
  console.log("this is the object getting sent",obj)
  let xAxis = await setData(obj.dates,"x")
  let yAxis = await setData(obj.count, "y")

  console.log(xAxis,yAxis)
  

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xAxis,  // x label
        datasets: [{
            label: 'Tracked habit',
            data: yAxis, //data to plot o
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                  display: false
                }
            }
        }
    }
});

// when closing modal destroy graph
const modal = document.querySelector(".modal");
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    console.log("graph destroyed")
    myChart.destroy()
  }
});
}




function currentUser() {
  const username = localStorage.getItem("username");
  return username;
}

function updateContent() {
  const path = location.hash;
  if (privateRoutes.includes(path) && !currentUser()) {
    location.hash = "#login";
  } else if (!privateRoutes.includes(path) && currentUser()) {
    location.hash = "#dashboard";
  } else {
    updateMain(path);
  }
}

const updateMain = (path) => {
  console.log("updating to,", path);
  if (path) {
    switch (path) {
      case "#logout":
        renderRegisterForm();
        break;
      case "#dashboard":
        renderDash();
        break;
      case "#signup":
        break;
      case "#login":
        break;
      default:
        render404();
        break;
    }
  } else {
    renderHomepage();
  }
};

const renderDash = () => {
  const forms = document.querySelector(".wrapper");
  forms.style.display = "none";
  const backGround = document.body;
  backGround.style.background = "white";
  const nav = document.querySelector(".navbar");
  nav.style.display = "flex";
  const habitForm = document.querySelector(".habit-container");
  habitForm.style.display = "flex";
};

const renderRegisterForm = () => {
  logout();
  const refresh = location.reload();
  return refresh;
};



const renderStreaks = (data) => {
  const streaks = document.createElement("div");
  streaks.classList.add("habit_details");

  const currenStreak = document.createElement("p");
  currenStreak.classList.add("streak_text");
  currenStreak.innerText = `current streak ${data.currentstreak} 🔥`;

  const maxStreak = document.createElement("p");
  maxStreak.classList.add("streak_text");
  maxStreak.innerText = `max streak ${data.maxstreak} 🔥`;

  streaks.appendChild(currenStreak);
  streaks.appendChild(maxStreak);
  return streaks;
};



const updateHabit = async (e) => {
  e.preventDefault();
  let username = localStorage.getItem("username");
  let habit_id = e.target.id
  let feed = document.querySelector('#habits')
  console.log("this is the feed",feed)
  try {
    const habitData = {
      habit_id: habit_id,
      username: username
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitData)
    };
    const res = await fetch(
      `http://localhost:3000/habits/${username}/habits/entries`,
      options
    );
    const data = await res.json();
    console.log("this is the data getting sent back",data);
    if (data.err) {
      console.warn(data.err);
      logout();
    }
    location.hash = `#dashboard`
    feed.innerHTML = ""
    setPosts(data)

    return data;
  } catch (err) {
    console.warn(err);
  }
};

const deleteHabit = async (e) => {
  const habit_id =  e.target.id;
  try {
    const options = {
      method: "DELETE",
      headers: new Headers({'Authorization': localStorage.getItem('token')}),
    };
    const res = await fetch(
      `http://localhost:3000/habits/delete/${habit_id}`,
      options
    );
    const data = await res.json();
    if (data.err) {
      console.warn(data.err);
      logout();
    }
     const container = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
     console.log()
     container.innerHTML = ""

    return data;
  } catch (err) {
    console.warn(err);
  }

}

const setPosts = (habits) => {
  habits.forEach((habit) => renderHabitPost(habit));
};




module.exports = { updateContent, logout, renderHabitPost, setPosts, setData};
