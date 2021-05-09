const addTaskBtn = document.getElementById('add-task-btn'); // получили элемент кнопку "Добавить"
const deskTaskImput = document.getElementById('description-task'); // получили элемент импут, в который вводим наши задачи
const todoWrapper = document.querySelector('.todos-wrapper'); // получили элемент, в который записываются задачи, которые мы вводим в импут

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemeElems = [];

function Task(description) { // создали шалон для задачи
    this.description = description; // Задача (то, что ввели в инпут)
    this.completed = false; // статус задачи, выполнена или нет. По умолчанию стоит не выполнена
}

const createTemlate = (task, index) => {
    return `
    <div class='todo-item ${task.completed ? 'checked' : ''}'>
        <div class='description'>${task.description}</div>
        <div class='buttons'>
          <input onclick="completeTask(${index})" class='btn-comlete' type="checkbox" ${task.completed ? 'checked' : ''}>
          <button onclick="deleteTask(${index})" class='btn-delete'><i class="material-icons">delete_outline </i></button>
        </div>
    </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
    todoWrapper.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todoWrapper.innerHTML += createTemlate(item, index);
        })
        todoItemeElems = document.querySelectorAll('.todo-item');
    }
};

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemeElems[index].classList.add('checked');
    } else {
        todoItemeElems[index].classList.remove('checked');
    }
    updateLocal(); 
    fillHtmlList();
};


addTaskBtn.addEventListener('click', () => { // Если мы кликнули на кнопку добавить, выполнить функцию
    tasks.push(new Task(deskTaskImput.value)); // Добавляем в наш массив в конец объект, который мы создали с помощью нашего шаблона Task
    updateLocal();
    fillHtmlList();
    deskTaskImput.value = '';
});

function checkPhoneKey(key) {
    if (key == 'Enter') {
        tasks.push(new Task(deskTaskImput.value)); // Добавляем в наш массив в конец объект, который мы создали с помощью нашего шаблона Task
        updateLocal();
        fillHtmlList();
        deskTaskImput.value = '';
        };
};


const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}