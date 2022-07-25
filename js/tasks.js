const getLists = () => {
  const lists = localStorage.getItem('to_do_lists');
  return lists === null ? [] : JSON.parse(lists);
};

const setLists = lists => {
  localStorage.setItem('to_do_lists', JSON.stringify(lists));
};

const renderLists = () => {
  const lists = getLists();
  const listsTable = document.getElementById('lists-table');
  listsTable.innerHTML = '<th>#</th><th>List Name</th>';
  for (let i = 0, len = lists.length; i < len; i++) {
    const taskRow = document.createElement('tr');
    taskRow.setAttribute('id', `${i + 1}`);

    const numCol = document.createElement('td');
    numCol.innerHTML = `${i + 1}`;
    taskRow.appendChild(numCol);

    const nameCol = document.createElement('td');
    nameCol.innerHTML = `${lists[i].name}`;
    nameCol.addEventListener('click', setCurrentListName);
    nameCol.setAttribute('class', 'list-name');
    taskRow.appendChild(nameCol);
    listsTable.appendChild(taskRow);
  }
};

const getCurrentListIndex = () => {
  const lists = getLists();
  const currentListName = document.getElementById('current-list-name');
  return lists.findIndex(list => list.name === currentListName.innerHTML);
};

const setCurrentListName = e => {
  const currentListName = document.getElementById('current-list-name');
  currentListName.innerHTML = e.target.innerHTML;
  renderTasks();
};

const renderTasks = () => {
  const lists = getLists();
  const currentTasks = lists[getCurrentListIndex()].tasks;
  const tasksTable = document.getElementById('tasks-table');
  tasksTable.innerHTML = '<th>#</th><th>Task Name</th><th>Done</th><th>Move Task</th>';
  for (let i = 0, len = currentTasks.length; i < len; i++) {
    const taskRow = document.createElement('tr');
    taskRow.setAttribute('id', `${i + 1}`);

    const numCol = document.createElement('td');
    numCol.innerHTML = `${i + 1}`;
    taskRow.appendChild(numCol);

    const nameCol = document.createElement('td');
    nameCol.innerHTML = `${currentTasks[i].name}`;
    taskRow.appendChild(nameCol);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (currentTasks[i].done) {
      checkbox.checked = true;
      nameCol.style.textDecorationLine = 'line-through';
    }
    checkbox.addEventListener('click', taskIsDone);
    const doneCol = document.createElement('td');
    doneCol.appendChild(checkbox);
    taskRow.appendChild(doneCol);

    const upBtn = document.createElement('input');
    upBtn.setAttribute('type', 'button');
    upBtn.setAttribute('value', 'Up');
    upBtn.addEventListener('click', moveTask);
    const downBtn = document.createElement('input');
    downBtn.setAttribute('type', 'button');
    downBtn.setAttribute('value', 'Down');
    downBtn.addEventListener('click', moveTask);
    const moveCol = document.createElement('td');
    moveCol.appendChild(upBtn);
    moveCol.appendChild(downBtn);
    taskRow.appendChild(moveCol);

    tasksTable.appendChild(taskRow);
  }
};

const addTask = () => {
  const lists = getLists();
  const newTaskName = document.getElementById('new-task-name');
  if (newTaskName.value.trim() === '') return;
  lists[getCurrentListIndex()].tasks.push({
    name: newTaskName.value,
    done: false
  });
  setLists(lists);
  renderTasks();
  newTaskName.value = '';
};

const taskIsDone = e => {
  const lists = getLists();
  const currentList = lists[getCurrentListIndex()];
  const i = +e.target.parentNode.parentNode.id - 1;
  currentList.tasks[i].done = e.target.checked ? true : false;
  if (currentList.tasks[i].done) {
    e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'line-through';
  } else {
    e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'none';
  }
  setLists(lists);
};

const deleteTask = e => {
  const lists = getLists();
  const currentTasks = lists[getCurrentListIndex()].tasks;
  let deleteNum = document.getElementById('delete-task-num');
  const deleteIndex = +deleteNum.value - 1;
  console.log(deleteIndex);
  if (deleteIndex < 0 || deleteIndex >= currentTasks.length) {
    return;
  }
  currentTasks.splice(deleteIndex, 1);
  setLists(lists);
  renderTasks();
  deleteNum.value = '';
};

const moveTask = e => {
  const lists = getLists();
  const currentTasks = lists[getCurrentListIndex()].tasks;
  const currentIndex = +e.target.parentNode.parentNode.id - 1;
  let newIndex;
  if (e.target.value === 'Up') {
    newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
  } else if (e.target.value === 'Down') {
    newIndex = currentIndex + 1 < currentTasks.length ? currentIndex + 1 : currentTasks.length - 1;
  }
  const temp = currentTasks[newIndex];
  currentTasks[newIndex] = currentTasks[currentIndex];
  currentTasks[currentIndex] = temp;
  setLists(lists);
  renderTasks();
};

const currentListName = document.getElementById('current-list-name');
currentListName.innerHTML = getLists()[0].name;
renderLists();
renderTasks();
const addBtn = document.getElementById('add-task-btn');
addBtn.addEventListener('click', addTask);
const deleteBtn = document.getElementById('delete-task-btn');
deleteBtn.addEventListener('click', deleteTask);
