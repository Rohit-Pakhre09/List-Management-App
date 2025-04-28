let btn = document.getElementById('btn');
let nameEl = document.getElementById('name');
let descEl = document.getElementById('desc');
let timeEl = document.getElementById('time');
let selectEl = document.getElementById('select');
let msg = document.getElementById('msg');
let outputs = document.getElementById('outputs');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = null;

displayTasks();

btn.addEventListener('click', (e) => {
    e.preventDefault();

    let nameInput = nameEl.value.trim();
    let descInput = descEl.value.trim();
    let timeInput = timeEl.value.trim();
    let priorityInput = selectEl.value.trim();

    if (!nameInput || !descInput || !timeInput || !priorityInput) {
        msg.textContent = 'Please fill all the input fields!';
        return;
    }

    msg.textContent = '';

    if (editIndex !== null) {
        tasks[editIndex] = {
            name: nameInput,
            description: descInput,
            duedate: timeInput,
            priority: priorityInput
        }
        editIndex = null;
        btn.textContent = "Submit";
    } else {
        let task = {
            name: nameInput,
            description: descInput,
            duedate: timeInput,
            priority: priorityInput
        };
        tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    nameEl.value = '';
    descEl.value = '';
    timeEl.value = '';
    selectEl.value = '';

    displayTasks();
});

function displayTasks() {
    outputs.innerHTML = '';

    if (tasks.length === 0) {
        outputs.innerHTML = '<p style="text-align: center; color: white;">No tasks available!</p>';
        return;
    }

    tasks.forEach((task, index) => {
        let taskCard = document.createElement('div');
        taskCard.style.background = 'white';
        taskCard.style.color = 'black';
        taskCard.style.padding = '15px';
        taskCard.style.marginBottom = '10px';
        taskCard.style.borderRadius = '10px';

        taskCard.innerHTML = `
            <h3 style="margin-bottom:5px;">${task.name}</h3>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Due Date:</strong> ${task.duedate}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <div style="margin-top: 10px;">
                <button onclick="editTask(${index})" style="padding: 5px 10px; background: orange; color: white; border: none; border-radius: 5px; cursor:pointer; margin-right: 10px;">Edit</button>
                <button onclick="deleteTask(${index})" style="padding: 5px 10px; background: red; color: white; border: none; border-radius: 5px; cursor:pointer;">Delete</button>
            </div>
        `;

        outputs.appendChild(taskCard);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    let task = tasks[index];
    nameEl.value = task.name;
    descEl.value = task.description;
    timeEl.value = task.duedate;
    selectEl.value = task.priority;

    editIndex = index;
    btn.textContent = 'Update';
}
