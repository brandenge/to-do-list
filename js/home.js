const getLists = () => {
  let lists = localStorage.getItem('to_do_lists');
  return lists === null ? [] : JSON.parse(lists);
};

const setLists = (lists) => {
  localStorage.setItem('to_do_lists', JSON.stringify(lists));
};

const renderLists = () => {
  const lists = getLists();
  const listsTable = document.getElementById('lists-table');
  listsTable.innerHTML = '<th>#</th><th>List Name</th><th>Done</th><th>Up/Down</th>';
  for (let i = 0, len = lists.length; i < len; i++) {
    const listRow = document.createElement('tr');
    listRow.setAttribute('id', `${i + 1}`);

    const numCol = document.createElement('td');
    numCol.innerHTML = `${i + 1}`;
    listRow.appendChild(numCol);

    const nameCol = document.createElement('td');
    nameCol.innerHTML = `${lists[i].name}`;
    listRow.appendChild(nameCol);

    const doneCol = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('value', 'isDone');
    if (lists[i].done) {
      checkbox.checked = true;
      nameCol.style.textDecorationLine = 'line-through';
    }
    checkbox.addEventListener('click', listIsDone);
    doneCol.appendChild(checkbox);
    listRow.appendChild(doneCol);

    const moveCol = document.createElement('td');
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
    tasks: [],
    done: false
  });
  setLists(lists);
  renderLists();
  newListName.value = '';
};

const listIsDone = e => {
  const lists = getLists();
  let i = +e.target.parentNode.parentNode.id - 1;
  lists[i].done = e.target.checked ? true : false;
  if (lists[i].done) {
    e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'line-through';
  } else {
    e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'none';
  }
  setLists(lists);
};

const deleteList = e => {
  
};

getLists();
renderLists();
const addListBtn = document.getElementById('add-list-btn');
addListBtn.addEventListener('click', addList);
const deleteBtn = document.getElementById('');
