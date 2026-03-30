// 1. Посилання на головні елементи DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 2. Функція для створення нового завдання
function createTaskElement(text) {
    const li = document.createElement('li');

    li.innerHTML = `
        <span class="task-text">${text}</span>
        <div class="actions">
            <button class="edit-btn">Редагувати</button>
            <button class="delete-btn">Видалити</button>
        </div>
    `;

    // Призначаємо обробники подій для кнопок всередині li
    const deleteBtn = li.querySelector('.delete-btn');
    const editBtn = li.querySelector('.edit-btn');

    deleteBtn.addEventListener('click', () => li.remove());
    editBtn.addEventListener('click', () => toggleEditMode(li, editBtn));

    return li;
}

// 3. Функція перемикання режиму редагування
function toggleEditMode(li, button) {
    const span = li.querySelector('.task-text');
    const isEditing = li.classList.contains('editing');

    if (!isEditing) {
        // Перехід у режим редагування
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        input.className = 'edit-input';

        li.classList.add('editing');
        li.replaceChild(input, span);
        button.textContent = 'Зберегти';
        button.style.backgroundColor = '#28a745'; // Змінюємо колір на зелений при збереженні
    } else {
        // Збереження результату
        const input = li.querySelector('.edit-input');
        const newText = input.value.trim();

        if (newText !== "") {
            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = newText;

            li.classList.remove('editing');
            li.replaceChild(span, input);
            button.textContent = 'Редагувати';
            button.style.backgroundColor = '#ffc107'; // Повертаємо колір
        } else {
            alert("Завдання не може бути порожнім!");
        }
    }
}

// 4. Головна функція додавання
function handleAddTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const newTask = createTaskElement(text);
    taskList.appendChild(newTask);
    
    taskInput.value = "";
    taskInput.focus(); // Повертаємо фокус на поле вводу
}

// 5. Слухачі подій
addBtn.addEventListener('click', handleAddTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddTask();
});