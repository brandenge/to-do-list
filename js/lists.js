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
  listsTable.innerHTML = '<th>#</th><th>List Name</th><th>Done</th><th>Move List</th>';
  for (let i = 0, len = lists.length; i < len; i++) {
    const listRow = document.createElement('tr');
    listRow.setAttribute('id', `${i + 1}`);

    const numCol = document.createElement('td');
    numCol.innerHTML = `${i + 1}`;
    listRow.appendChild(numCol);

    const nameCol = document.createElement('td');
    nameCol.innerHTML = `${lists[i].name}`;
    listRow.appendChild(nameCol);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (lists[i].done) {
      checkbox.checked = true;
      nameCol.style.textDecorationLine = 'line-through';
    }
    checkbox.addEventListener('click', listIsDone);
    const doneCol = document.createElement('td');
    doneCol.appendChild(checkbox);
    listRow.appendChild(doneCol);

    const upBtn = document.createElement('input');
    upBtn.setAttribute('type', 'button');
    upBtn.setAttribute('value', 'Up');
    upBtn.addEventListener('click', moveList);
    const downBtn = document.createElement('input');
    downBtn.setAttribute('type', 'button');
    downBtn.setAttribute('value', 'Down');
    downBtn.addEventListener('click', moveList);
    const moveCol = document.createElement('td');
    moveCol.appendChild(upBtn);
    moveCol.appendChild(downBtn);
    listRow.appendChild(moveCol);

    listsTable.appendChild(listRow);
  }
};

const addList = () => {
  const newListName = document.getElementById('new-list-name');
  if (newListName.value.trim() === '') return;
  const lists = getLists();
  lists.push({
    name: newListName.value,
    done: false,
    tasks: []
  });
  setLists(lists);
  renderLists();
  newListName.value = '';
};

const listIsDone = e => {
  const lists = getLists();
  const i = +e.target.parentNode.parentNode.id - 1;
  lists[i].done = e.target.checked ? true : false;
  if (lists[i].done) {
    e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'line-through';
  } else {
    e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'none';
  }
  setLists(lists);
};

const deleteList = e => {
  const lists = getLists();
  let deleteNum = document.getElementById('delete-list-num');
  const deleteIndex = +deleteNum.value - 1;
  if (deleteIndex < 0 || deleteIndex >= lists.length) {
    return;
  }
  lists.splice(deleteIndex, 1);
  setLists(lists);
  renderLists();
  deleteNum.value = '';
};

const moveList = e => {
  const lists = getLists();
  const currentIndex = +e.target.parentNode.parentNode.id - 1;
  let newIndex;
  if (e.target.value === 'Up') {
    newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
  } else if (e.target.value === 'Down') {
    newIndex = currentIndex + 1 < lists.length ? currentIndex + 1 : lists.length - 1;
  }
  const temp = lists[newIndex];
  lists[newIndex] = lists[currentIndex];
  lists[currentIndex] = temp;
  setLists(lists);
  renderLists();
};

renderLists();
const addBtn = document.getElementById('add-list-btn');
addBtn.addEventListener('click', addList);
const deleteBtn = document.getElementById('delete-list-btn');
deleteBtn.addEventListener('click', deleteList);
