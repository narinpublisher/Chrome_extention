const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
 
function addTask(taskText) {
  const li = document.createElement('li');
 
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
 
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
 
form.addEventListener('submit', (event) => {
  event.preventDefault();
 
  const taskText = input.value.trim();
  if (taskText === '') return;
 
  addTask(taskText);
 
  input.value = '';
  input.focus();
});

list.addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (!li) return;
 
  if (event.target.classList.contains('task-checkbox')) {
    li.classList.toggle('completed');
  }
 
  if (event.target.classList.contains('delete-btn')) {
    li.remove();
  }
});
