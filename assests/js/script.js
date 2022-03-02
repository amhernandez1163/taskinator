//creating a variable for form let's us interact with the form and some of it's child HTML elements
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
    //tells browser to not immediately refresh page upon clicking a button. 
    event.preventDefault();

    //when we use a square bracket in a selector, we're trying to select an HTML element by one of it's attributes - input element that has a name attribute set to task-name. We use single ' or else the string would fail
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //we used console.dir(taskNameInput); to see in the console where our data was being stored = GETTING | -the we added it to the var taskNameInput = SETTING

    //create a new task item to the DOM - adding li element under ul 
    var listItemEl = document.createElement("li");
    // style the new task item w selector style already being used in current css
    listItemEl.className = "task-item";
    // adding text to the newly created li - it now equals taskNameInput - which is the new variable we created to store our input
    listItemEl.textContent = taskNameInput;
     // appending this element to the task - no need to add to HTML
     tasksToDoEl.appendChild(listItemEl);
}

//adding event listener to function above - because function is created, we can call it below - "when a user clicks a button element w a type attribute that has a value of submit, when the user presses Enter on keyboard" run fuction
formEl.addEventListener("submit", createTaskHandler);