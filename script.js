
//input field
const newTaskInput = document.getElementById("new-task");

//button add task
const addTaskButton = document.getElementById("addTask");


//list of incomplete task
const incompleteTaskList= document.getElementById("items");

//list of completed taks
const completedTaskList = document.querySelector(".complete-list ul");

//track the task being edited
let editingTask = null;

//add or update task
function addOrUpdateTask(event){
    //prevent reload
    event.preventDefault();

    //get the task text
    const taskText = newTaskInput.value.trim();
    
    if(taskText === "") return;

    if(editingTask){
        //editing task
        editingTask.querySelector("label").textContent = taskText;
        addTaskButton.value = "Add Task"
        editingTask = null;

    }else{
        //add new task
        const listItem = createTaskElement(taskText);
        incompleteTaskList.appendChild(listItem);
    }

    newTaskInput.value = ""; //clear the input field. 


}

//adding /updating task
addTaskButton.addEventListener("click", addOrUpdateTask);



function createTaskElement(taskText){
    //li create
    const li = document.createElement("li");
    li.classList.add("item");

    //checkbox create
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    //complete event fire
    checkbox.addEventListener("change", completeTask);

    //label create
    const label = document.createElement("label");
    label.textContent = taskText;


    //edit button 
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");

    //edit event fire
    editButton.addEventListener("click", editTask);

    //edit event fire

    //add element to the list item
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editButton);

    return li;
}

//edit task fun
function editTask(){
    const listItem = this.parentElement; //get the parent(li)
    const label = listItem.querySelector("label"); // get label
    
    //populate the new taks with
    newTaskInput.value = label.textContent;

    //update the add task button to update task
    addTaskButton.value = "Update Task";
    editingTask = listItem; //set the editing mode

}

//mark as completed
function completeTask(){
    const listItem = this.parentElement; //get the parent li
    this.remove(); //remove the this checkbox
    listItem.querySelector(".edit").remove(); //remove edit button

    //create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", deleteTask);

    listItem.appendChild(deleteButton); //add the delete button 
    
    // /add the taks item to complete task
    completedTaskList.appendChild(listItem);

}

//delete a completed task
function deleteTask(){
    const listItem = this.parentElement; //get parent li
    listItem.remove();
}


