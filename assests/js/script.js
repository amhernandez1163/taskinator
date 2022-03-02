//creating a variable for form let's us interact with the form and some of it's child HTML elements
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
    //tells browser to not immediately refresh page upon clicking a button. 
    event.preventDefault();

    //create a new task item to the DOM - adding li element under ul 
    var listItemEl = document.createElement("li");
    // style the new task item w selector style already being used in current css
    listItemEl.className = "task-item";
    // adding text to the newly created li 
    listItemEl.textContent = "This is a new task";
     // appending this element to the task - no need to add to HTML
     tasksToDoEl.appendChild(listItemEl);
}

//adding event listener to function above - because function is created, we can call it below - "when a user clicks a button element w a type attribute that has a value of submit, when the user presses Enter on keyboard" run fuction
formEl.addEventListener("submit", createTaskHandler);