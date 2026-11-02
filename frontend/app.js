const API_URL = 'http://localhost:3000/tasks';
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// 1. Load tasks when the page opens
window.onload = fetchTasks;

// 2. GET: Fetch all tasks from the API
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// 3. Render tasks to the HTML
function renderTasks(tasks) {
    taskList.innerHTML = ''; // Clear list
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        // Task Title
        const span = document.createElement('span');
        span.textContent = task.title;
        li.appendChild(span);

        // Action Buttons (Toggle & Delete)
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('task-actions');

        // Toggle Button
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Undo' : 'Done';
        toggleBtn.onclick = () => toggleTask(task.id, !task.completed);
        actionsDiv.appendChild(toggleBtn);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTask(task.id);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });
}

// 4. POST: Add a new task
async function addTask() {
    const title = taskInput.value.trim();
    if (!title) return alert('Please enter a task');

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        taskInput.value = ''; // Clear input
        fetchTasks(); // Refresh list
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// 5. PATCH: Toggle completed status
async function toggleTask(id, completed) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed })
        });
        fetchTasks(); // Refresh list
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

// 6. DELETE: Remove a task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks(); // Refresh list
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}