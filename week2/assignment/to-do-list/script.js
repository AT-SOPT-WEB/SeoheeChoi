const STORAGE_KEY = 'todoList';
let todos = []; 
let dragStartIndex;

window.onload = () => {
  initData();
  document.getElementById('checkAll').addEventListener('change', toggleAllCheckboxes);
  document.addEventListener('change', onCheckboxChange);
};

function initData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    todos = JSON.parse(saved);
    renderTable();
  } else {
    fetch('./todos.json')
      .then(res => res.json())
      .then(data => {
        todos = data;
        saveTodos();
        renderTable();
      });
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTable(filtered = todos) {
  const tbody = document.getElementById('todoTableBody');
  tbody.innerHTML = '';
  filtered.forEach(todo => tbody.appendChild(createRow(todo)));
}

function createRow(todo) {
  const row = document.createElement('tr');
  row.setAttribute('draggable', 'true');
  row.setAttribute('data-id', todo.id);

  if (todo.completed) row.classList.add('table-secondary');

  row.innerHTML = `
    <td><input type="checkbox" data-id="${todo.id}" /></td>
    <td>${todo.title}</td>
    <td>${todo.completed ? '🎉 Done' : '⏳ Not yet'}</td>
    <td>${getPriorityBadge(todo.priority)}</td>
  `;
  addDragEvents(row);
  return row;
}

function getPriorityBadge(priority) {
  const labels = ['❤️ Priority 1', '💛 Priority 2', '💚 Priority 3'];
  return `<span>${labels[priority - 1]}</span>`;
}

function addTodo() {
  const title = document.getElementById('todoInput').value.trim();
  const priority = parseInt(document.getElementById('prioritySelect').value);

  if (!title || !priority) {
    alert('Please enter both task and priority!');
    return;
  }

  todos.push({ id: Date.now(), title, completed: false, priority });
  saveTodos();
  clearInputs();
  renderTable();
}

function clearInputs() {
  document.getElementById('todoInput').value = '';
  document.getElementById('prioritySelect').value = '';
}

function getSelectedIds() {
  return Array.from(document.querySelectorAll('tbody input:checked'))
              .map(input => parseInt(input.dataset.id));
}


function deleteSelected() {
  const selected = getSelectedIds();
  todos = todos.filter(t => !selected.includes(t.id));
  saveTodos();
  renderTable();
}

function markCompleted() {
    const selected = getSelectedIds();
    const hasCompleted = todos.some(t => selected.includes(t.id) && t.completed);
  
    if (hasCompleted) {
      const modal = new bootstrap.Modal(document.getElementById('modal'));
      modal.show();
      return;
    }
  
    todos = todos.map(t => selected.includes(t.id) ? { ...t, completed: true } : t);
    saveTodos();
    renderTable();
  }

function toggleAllCheckboxes(e) {
  const checked = e.target.checked;
  document.querySelectorAll('tbody input[type="checkbox"]').forEach(cb => cb.checked = checked);
}

function onCheckboxChange(e) {
  if (e.target.closest('tbody') && e.target.type === 'checkbox') {
    const all = document.querySelectorAll('tbody input[type="checkbox"]');
    const checked = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    document.getElementById('checkAll').checked = all.length > 0 && checked.length === all.length;
  }
}

function filterTodos(type) {
  if (type === 'all') return renderTable();
  const isCompleted = type === 'completed';
  renderTable(todos.filter(t => t.completed === isCompleted));
}

function filterPriority(priority) {
  renderTable(todos.filter(t => t.priority === priority));
}

function addDragEvents(row) {
  row.addEventListener('dragstart', () => {
    dragStartIndex = Array.from(row.parentNode.children).indexOf(row);
    row.classList.add('dragging');
  });

  row.addEventListener('dragover', e => e.preventDefault());

  row.addEventListener('drop', () => {
    const dragEndIndex = Array.from(row.parentNode.children).indexOf(row);
    const item = todos.splice(dragStartIndex, 1)[0];
    todos.splice(dragEndIndex, 0, item);
    saveTodos();
    renderTable();
  });

  row.addEventListener('dragend', () => {
    row.classList.remove('dragging');
  });
}
