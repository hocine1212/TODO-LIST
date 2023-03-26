let tasks = [
  {
    title: "البحث عن عمل",
    date: "10/10/2022",
    isDone: false,
  },
  {
    title: "الرياضة الصباحية",
    date: "12/5/2021",
    isDone: false,
  },
  {
    title: "العاب الفيديو",
    date: "5/12/2023",
    isDone: true,
  },
];
// it should be an empty array tasks=[]; but i filled it on purpose to encounter the null problem which is solved in getStoragedTasks() function

function getStoragedTasks() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (retrievedTasks === null) {
    tasks = [];
  } else {
    tasks = retrievedTasks;
  }
  // short code for if Statement : tasks = retrievedTasks ?? [] same code but shortter ??=null
}
getStoragedTasks();

function fillTaskOnPage() {
  let tasksClass = document.querySelector(".tasks");
  tasksClass.innerHTML = "";
  let index = 0;
  for (let i = 0; i < tasks.length; i++) {
    let content = `<div class="content ${tasks[i].isDone ? "done" : ""}">
        <div class="task ">
          <div class="tasks-info">
            <h2>${tasks[i].title}</h2>
            <div>
              <span class="material-symbols-outlined">
                calendar_month
              </span>
              <span>${tasks[i].date}</span>
            </div>
          </div>
        </div>
        <div class="actions">
          <button onClick="deleteIndex(${index})" class="delete circular">
            <span class="material-symbols-outlined"> delete </span>
          </button>
          ${
            tasks[i].isDone
              ? `<button onClick="toggleTaskComplition(${index})" class="checkmark circular" style="background-color:red ; line-height: 0">
          <span class="material-symbols-outlined" > cancel </span>
        </button>`
              : `<button onClick="toggleTaskComplition(${index})" class="checkmark circular">
          <span class="material-symbols-outlined"> done </span>
        </button>`
          }
          
          <button onClick="editTask(${index})" class="edit circular">
            <span class="material-symbols-outlined"> edit </span>
          </button>
        </div>
      </div>`;
    tasksClass.innerHTML += content;

    index++;
  }
}

fillTaskOnPage();

let addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", () => {
  let addTask = prompt("أضف مهمة جديدة");
  let date = new Date();
  let now = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;
  let taskObj = {
    title: addTask,
    date: now,
    isDone: false,
  };
  if (addTask) {
    tasks.push(taskObj);
    storageTasks();
    fillTaskOnPage();
  }
});

function deleteIndex(index) {
  let taskName = tasks[index];
  let isConfirmed = confirm("هل أنت متأكد أنك تريد حذف : " + taskName.title);
  if (isConfirmed) {
    tasks.splice(index, 1);
    storageTasks();
    fillTaskOnPage();
  }
}

function editTask(index) {
  let task = tasks[index];
  let newTaskTitle = prompt("الرجاء تحديد عنوان المهمة الجديد", task.title);
  let date = new Date();
  let now = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;

  if (newTaskTitle) {
    task.date = now;
    task.title = newTaskTitle;
    storageTasks();
    fillTaskOnPage();
  }
}

function toggleTaskComplition(index) {
  let task = tasks[index];

  if (task.isDone) {
    task.isDone = false;
  } else {
    task.isDone = true;
  }
  storageTasks();
  fillTaskOnPage();
}

function storageTasks() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
}
