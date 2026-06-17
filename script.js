let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const title = document.getElementById('taskInput').value.trim();
  const priority = document.getElementById('prioritySelect').value;

  if (!title) {
    alert('Please enter a task!');
    return;
  }

  const task = {
    id: Date.now(),
    title,
    priority,
    completed: false,
    createdAt: new Date().toLocaleDateString()
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  document.getElementById('taskInput').value = '';
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  renderTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  let filtered = tasks;
  if (currentFilter === 'pending') {
    filtered = tasks.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = tasks.filter(t => t.completed);
  }

  if (filtered.length === 0) {
    list.innerHTML = '<p style="text-align:center; color:#a0aec0; margin-top:20px;">No tasks found!</p>';
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.priority} ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span class="task-title">${task.title}</span>
      <span class="badge ${task.priority}">${task.priority}</span>
      <small style="color:#a0aec0">${task.createdAt}</small>
      <div class="task-buttons">
        <button class="btn-complete" onclick="toggleComplete(${task.id})">
          ${task.completed ? 'Undo' : 'Done'}
        </button>
        <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

renderTasks();
