const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
 
function addTask(taskText, id = Date.now(), completed = false) {
  const li = document.createElement('li');
  li.dataset.id = id;
  if (completed) li.classList.add('completed');
 
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = completed;
 
  const span = document.createElement('span');
  span.textContent = taskText;
  span.className = 'task-text';
 
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = '✕';
  deleteBtn.className = 'delete-btn';
 
  li.append(checkbox, span, deleteBtn);
  list.appendChild(li);
}

function saveTasks() {
  const tasks = [...list.children].map((li) => ({
    id: Number(li.dataset.id),
    text: li.querySelector('.task-text').textContent,
    completed: li.classList.contains('completed'),
  }));
 
  chrome.storage.sync.set({ tasks });
}
 
form.addEventListener('submit', (event) => {
  event.preventDefault();
 
  const taskText = input.value.trim();
  if (taskText === '') return;
 
  addTask(taskText);
  saveTasks();
 
  input.value = '';
  input.focus();
});

list.addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (!li) return;
 
  if (event.target.classList.contains('task-checkbox')) {
    li.classList.toggle('completed');
    saveTasks();
  }
 
  if (event.target.classList.contains('delete-btn')) {
    li.remove();
    saveTasks();
  }
});

chrome.storage.sync.get(['tasks'], (result) => {
  const savedTasks = result.tasks || [];
  savedTasks.forEach((task) => {
    addTask(task.text, task.id, task.completed);
  });
});