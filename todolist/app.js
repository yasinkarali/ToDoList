const taskDescription = document.getElementById("txt-task-description");
const taskAdd = document.getElementById("btn-add-task");
const taskUpdate = document.getElementById("btn-update-task");

const taskList = document.getElementById("task-list");

let editedTaskId;

let taskListArray = [
    
    
];

localStorage.setItem("TaskList",JSON.stringify(taskListArray));



taskAdd.addEventListener("click",addTask);
taskUpdate.addEventListener("click",updateTask);

function displayTasks(){
    taskList.innerHTML = "";
    if (taskListArray.length==0) {
        taskList.innerHTML = " <div class='alert alert-warning mb-0 '> Henüz bir görev girilmedi! </div>";
    }
    else{
        for (const task of taskListArray) {
                let taskLi = ` <li class="list-group-item task d-flex justify-content-between align-items-center ">
                            <div class="form-check  ">
                                <label for="${task.id}" > ${task.description}</label>
                                <input type="checkbox" class="form-check-input" id="${task.id}" ${task.completed ? "checked" : ""} onclick="toggleTaskCompletion(${task.id})">
                            </div>

                            <div class="btn-group" role="group">
                                <button onclick="deleteTask(${task.id})" type="button" class="btn btn-danger btn-sm">Sil</button>
                                <button onclick="editTask(${task.id},'${task.description}')" type="button" class="btn btn-warning btn-sm">Düzenle</button>
                            </div>

                        </li>`;
                taskList.insertAdjacentHTML("beforeend",taskLi)
        }
            }
  
};

function addTask(e){
    e.preventDefault();
   const value = taskDescription.value.trim();
   if (value=="") {
        alert("Lütfen yapılacak işi ekleyin");
   }
   else{
        const id = taskListArray==0 ? 1 : taskListArray[taskListArray.length-1].id + 1;
        const newTask = {
            id : id,
            description : value,
            completed: false,
        };
        taskListArray.push(newTask);
        setTasks();
        taskDescription.value="";
       
        displayTasks();
   }
    taskDescription.focus();
};


function deleteTask(id){
    const answer = confirm("Silmek istedğinizden emin misiniz?");
    if (answer) {
            for (const taskIndex in taskListArray) {
                if (taskListArray[taskIndex].id==id) {
                    taskListArray.splice(taskIndex,1);
                    setTasks();
                    displayTasks();
                    break;
                }
        }
    }
    
}

function updateTask(e){
    e.preventDefault();
    const value = taskDescription.value.trim();
    if (value=="") {
        alert("Lütfen yapılacak işi ekleyin");
    }
    else{
        for (const task of taskListArray) {
            if (editedTaskId==task.id) {
                task.description=value;
                 setTasks();
                editedTaskId=null;
                taskAdd.classList.remove("d-none");
                taskUpdate.classList.add("d-none");
               
                displayTasks();
                taskDescription.focus();
                taskDescription.value="";
                break;
            }
        }
    }
}


function editTask(id,taskDes){
       taskAdd.classList.add("d-none");
       taskUpdate.classList.remove("d-none");
       taskDescription.value =taskDes;
       taskDescription.focus();
       editedTaskId = id;
}

function toggleTaskCompletion(id) {
    for (const task of taskListArray) {
        if (task.id == id) {
            task.completed = !task.completed; // Mevcut durumu tersine çevir
            setTasks(); // Güncellenmiş durumu kaydet
            break;
        }
    }
    displayTasks(); // Listeyi yeniden göster
}

function setTasks(){
    localStorage.setItem("TaskLists",JSON.stringify(taskListArray));
}

function getTasks(){
    let gorevlistesi = localStorage.getItem("TaskLists");
    if (gorevlistesi!=null) {
        taskListArray = JSON.parse(gorevlistesi) ;
    }
}

getTasks();
displayTasks();








