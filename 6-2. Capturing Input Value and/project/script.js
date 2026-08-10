const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
 
form.addEventListener('submit', (event) => {
  event.preventDefault();
 
  const taskText = input.value.trim();
  if (taskText === '') return;
 
  const li = document.createElement('li');
  li.textContent = taskText;
  list.appendChild(li);
 
  input.value = '';
  input.focus();
});