
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Будь ласка, введіть текст задачі!");
        return;
    }

  
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" style="background: #ff5e5e; padding: 5px 10px; font-size: 12px;">Видалити</button>
    `;


    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
    });

    taskList.appendChild(li);

    taskInput.value = "";
}

addBtn.addEventListener('click', addTask);


taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});