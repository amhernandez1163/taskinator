var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function () {
    //create a new task item to the DOM - adding li element under ul 
    var listItemEl = document.createElement("li");
    // style the new task item w selector style already being used in current css
    listItemEl.className = "task-item";
    // adding text to the newly created item
    listItemEl.textContent = "This is a new task";
     // appending this element to the task
     tasksToDoEl.appendChild(listItemEl);
}

//adding event listener to function above - because function is created, we can call it below - "on a button click, create a task"
buttonEl.addEventListener("click", createTaskHandler); 