//creating a variable for form let's us interact with the form and some of it's child HTML elements
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
    //tells browser to not immediately refresh page upon clicking a button. 
    event.preventDefault();

    //when we use a square bracket in a selector, we're trying to select an HTML element by one of it's attributes - input element that has a name attribute set to task-name. We use single ' or else the string would fail
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // references the tasky type value that in the dropdown - Work, Class, Personal 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //we used console.dir(taskNameInput); to see in the console where our data was being stored = GETTING | -the we added it to the var taskNameInput = SETTING

    //packaging up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
}

// will hold the code that creates a new task HTML element
var createTaskEl = function(taskDataObj) {
  //create a new task item to the DOM - adding li element under ul 
  var listItemEl = document.createElement("li");
  // style the new task item w selector style already being used in current css
  listItemEl.className = "task-item";
  // creating a div so all content is bundled together 
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  // adding text to the newly created li - it now equals taskNameInput - which is the new variable we created to store our input
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
   // appending this element to the LI
  listItemEl.appendChild(taskInfoEl);
  // append entire LI to the parent UL
  tasksToDoEl.appendChild(listItemEl);
}

//adding event listener to function above - because function is created, we can call it below - "when a user clicks a button element w a type attribute that has a value of submit, when the user presses Enter on keyboard" run fuction
formEl.addEventListener("submit", taskFormHandler);