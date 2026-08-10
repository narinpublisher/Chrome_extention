const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
 
function addTask(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;
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