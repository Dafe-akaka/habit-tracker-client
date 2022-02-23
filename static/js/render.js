const publicRoutes = ["#", "#login", "#signup"];
const privateRoutes = ["#dashboard", "#profile"];

function logout() {
  localStorage.clear();
  window.location.hash = "#logout";
}

function currentUser() {
  const username = localStorage.getItem("username");
  return username;
}

function updateContent() {
  const path = window.location.hash;
  if (privateRoutes.includes(path) && !currentUser()) {
    window.location.hash = "#login";
  } else if (!privateRoutes.includes(path) && currentUser()) {
    window.location.hash = "#dashboard";
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
        console.log("public route");
        break;
        case "#login":
        console.log("public route");
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

const setPosts = (habits) => {
  habits.forEach((habit) => renderHabitPost(habit));
};


const renderStreaks = (data) => {
  const streaks = document.createElement("div")
  streaks.classList.add('habit_details')

  const currenStreak = document.createElement("p")
  currenStreak.classList.add("streak_text")
  currenStreak.innerText = `current streak ${data.currentstreak} 🔥`
  

  const maxStreak = document.createElement("p")
  maxStreak.classList.add("streak_text")
  maxStreak.innerText = `max streak ${data.maxstreak} 🔥`

  streaks.appendChild(currenStreak)
  streaks.appendChild(maxStreak)
  return streaks
}

const updateProgressbar = (data) => {
  console.log(data)
  console.log(data.currentfrequency,data.frequency)
  let value = Math.round(data.currentfrequency/data.frequency);
  
  const progress = document.createElement('div')
  progress.classList.add("progress")

  //create progress_fill
  const progressFill = document.createElement("div")
  progressFill.classList.add("progress__fill")
  progressFill.style.width = `${value}%`

  // add text to fill
  const progress__text = document.createElement("span")
  progress__text.classList.add("progress__text")
  progress__text.textContent = `${value}%`
  progressFill.appendChild(progress__text)
  progress.appendChild(progressFill)

  return progress
}

const createBtn = () => {
  ///add buttons to card  (+, edit, delete)
  const controls = document.createElement("div")
  controls.classList.add("control")
  const updateBtn = document.createElement("button")
  updateBtn.classList.add("btn")
  const editBtn = document.createElement("button")
  editBtn.classList.add("btn")
  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("btn")
  
  //add span inside buttons
  const update = document.createElement("span")
  
  update.innerText = "+"
  updateBtn.appendChild(update)

  const edit = document.createElement("span")
  
  edit.innerText = "data"
  editBtn.appendChild(edit)

  const del = document.createElement("span")
  del.innerText = "delete"
  deleteBtn.appendChild(del)

  controls.appendChild(updateBtn)
  controls.appendChild( editBtn)
  controls.appendChild(deleteBtn)

 return controls
}

const renderHabitPost = ( data) => {
  //create two card 
  const card =  document.createElement('div')
  card.classList.add('details')

  const streakCard = renderStreaks(data)

  //create & add title
  const title =document.createElement("h1")
  title.textContent = data.habitdescription
  card.appendChild(title)

  const progress = updateProgressbar(data)
  
  //create progress bar
  card.appendChild(progress)

  const controls = createBtn()
  card.appendChild(controls)

  const box = document.createElement("div")
  box.classList.add("container")
  box.appendChild(card)
  box.appendChild(streakCard)

  
  const habitContainer = document.createElement("div")
  habitContainer.classList.add("posts-container")
  habitContainer.appendChild(box)

  const wrapper = document.querySelector("#habits")
  wrapper.appendChild(habitContainer)

}


module.exports = { updateContent, logout, setPosts };
