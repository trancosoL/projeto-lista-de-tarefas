const inputTasks = document.querySelector('.input-tasks');
const btnTasks = document.querySelector('.btn-tasks');
const tasks = document.querySelector('.tasks');

function getLi() {
    const li = document.createElement('li');
    return li;
}

inputTasks.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if(!inputTasks.value) return;
        getTasks(inputTasks.value);
    }
})

function cleanInput(){
    inputTasks.value = '';
    inputTasks.focus();
}

function createButtonClean(li){
    li.innerText += ' ';
    const buttonClean = document.createElement('button');
    buttonClean.innerText = 'Conscluído';
    buttonClean.setAttribute('class', 'clean');
    buttonClean.setAttribute('title', 'clean tasks');
    li.appendChild(buttonClean);
}

function getTasks(textInput) {
    const li = getLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    cleanInput();
    createButtonClean(li);
    saveTasks();
}

btnTasks.addEventListener('click', function(e){
    if(!inputTasks.value) return;
    getTasks(inputTasks.value);
    inputTasks.focus();

})

document.addEventListener('click', function(e){
    const element = e.target;
    if (element.classList.contains('clean')) {
        element.parentElement.remove();
        saveTasks();
    }
})

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const listOfTasks = [];

    for (let tasks of liTasks){
        let taskText = tasks.innerText;
        taskText = taskText.replace('clean',  '').trim();
        listOfTasks.push(taskText);
        }

        const tasksJSON = JSON.stringify(listOfTasks);
        localStorage.setItem('tasks', tasksJSON);
}

function addSavedTasks(){
    const tasks = localStorage.getItem('tasks');
    const listOfTasks = JSON.parse(tasks);
    for (let tasks of listOfTasks) {
        getTasks(tasks);
    }
}

addSavedTasks();
