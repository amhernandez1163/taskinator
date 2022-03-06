//creating a variable for form let's us interact with the form and some of it's child HTML elements
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
// empty tasks array - when we create a new task, the object holding all of its data can be added to the array
var tasks = [];

var taskFormHandler = function (event) {
    //tells browser to not immediately refresh page upon clicking a button. 
    event.preventDefault();

    //when we use a square bracket in a selector, we're trying to select an HTML element by one of it's attributes - input element that has a name attribute set to task-name. We use single ' or else the string would fail
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // references the tasky type value that in the dropdown - Work, Class, Personal 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //we used console.dir(taskNameInput); to see in the console where our data was being stored = GETTING | -the we added it to the var taskNameInput = SETTING

    //check if input values are empty strings BEGIN AGAIN
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    var isEdit = formEl.hasAttribute("data-task-id");
   
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }

    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do",
        };

        createTaskEl(taskDataObj);
    }
};

// will hold the code that creates a new task HTML element
var createTaskEl = function(taskDataObj) {
  //create a new task item to the DOM - adding li element under ul 
  var listItemEl = document.createElement("li");
  // style the new task item w selector style already being used in current css
  listItemEl.className = "task-item";
  // adding task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  // creating a div so all content is bundled together 
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  // adding text to the newly created li - it now equals taskNameInput - which is the new variable we created to store our input
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
   // appending this element to the LI
  listItemEl.appendChild(taskInfoEl);

  // part of code adding edit delete buttons   
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  // append entire LI to the parent UL
  
  switch (taskDataObj.status) {
    case "to do":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0; 
        tasksToDoEl.append(listItemEl);
          break;
    case "in progress":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
        tasksInProgressEl.append(listItemEl);
        break;
    case "compelted":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
        tasksCompletedEl.append(listItemEl);
        break;
    default:
        console.log("Something went wrong!");
  }

  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);

  //saves tasks to localStorage
  saveTasks();

  //increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function (taskId) {
    // container to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // creating the edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // creating the delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    // creating status options 
    var statusChoices = ["To Do", "In Progress", "Completed"];
    
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop thorugh tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        //wrapped taskId w parseInt() function to convert value as a number
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    formEl.querySelector("#save-task").textContent = "Add Task";

    //saves taks to local storage
    saveTasks ();
};

// targetting delete and edit button specifically
var taskButtonHandler = function(event) {
    var targetEl = event.target;
    // edit button functionality 
    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button functionality 
    else if (targetEl.matches(".delete-btn")) {
        console.log("delete", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event) {
    console.log(event.target.value);
    // get the task item's id 
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's values and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") { 
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) { 
            tasks[i].status = statusValue;
        }
    }

    // saves to localStorage
    saveTasks();

};

var editTask = function (taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    //edits input field to Save Task after pressing edit
    formEl.document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function (taskId) {
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //creating new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        //if tasks [i].id doesn't match the value of taskId, let's keep that task
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updated TaskArr
    tasks = updatedTaskArr;

    saveTasks();
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function () { 
    // retreive tasks from localStorage 
    var savedTasks = localStorage.getItem("tasks");
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedTasks) {
        return false;
    }
    console.log("Saved tasks found!");
    // else, load up saved tasks

    // Parse into array of objects
    savedTasks = JSON.parse(savedTasks);

    // loop through savedTasks array
    for (var i =0; i <saveTasks.length; i++) {
        // pas each task object into the createTaskEl
        createTaskEl(saveTasks[i]);
    }
};

//adding event listener to function above - because function is created, we can call it below - "when a user clicks a button element w a type attribute that has a value of submit, when the user presses Enter on keyboard" run fuction
formEl.addEventListener("submit", taskFormHandler);
// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();