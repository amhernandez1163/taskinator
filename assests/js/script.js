//creating a variable for form let's us interact with the form and some of it's child HTML elements
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var taskFormHandler = function (event) {
    //tells browser to not immediately refresh page upon clicking a button. 
    event.preventDefault();

    //when we use a square bracket in a selector, we're trying to select an HTML element by one of it's attributes - input element that has a name attribute set to task-name. We use single ' or else the string would fail
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // references the tasky type value that in the dropdown - Work, Class, Personal 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //we used console.dir(taskNameInput); to see in the console where our data was being stored = GETTING | -the we added it to the var taskNameInput = SETTING

    //check if input values are empty strings 
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();
    
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
            type: taskTypeInput
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
  tasksToDoEl.appendChild(listItemEl);

  //increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function (taskId) {

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
    var statusChoices = ["To Do", "In Progress", "Compeleted"];
    
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

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

//adding event listener to function above - because function is created, we can call it below - "when a user clicks a button element w a type attribute that has a value of submit, when the user presses Enter on keyboard" run fuction
formEl.addEventListener("submit", taskFormHandler);

// targetting delete and edit button specifically
var taskButtonHandler = function(event) {
    var targetEl = event.target;
    // edit button functionality 
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button functionality 
    else if (targetEl.matches(".delete-btn")) {
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
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    //edits input field to Save Task after pressing edit
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);