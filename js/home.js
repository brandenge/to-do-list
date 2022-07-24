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
  listsTable.innerHTML = '<th>#</th><th>List Name</th><th>Done</th><th>Delete</th><th>Up/Down</th>';
  for (let i = 0, len = lists.length; i < len; i++) {
    const list = document.createElement('tr');
    list.innerHTML = `<td>${i + 1}</td><td>${lists[i].name}</td>`;
    const doneCol = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('value', 'isDone');
    checkbox.setAttribute('id', `${i + 1}`)
    if (lists[i].done) checkbox.setAttribute('checked');
    checkbox.addEventListener('click', listIsDone);
    doneCol.appendChild(checkbox);
    list.appendChild(doneCol);
    const deleteCol = document.createElement('td');
    list.appendChild(deleteCol);
    const moveCol = document.createElement('td');
    list.appendChild(moveCol);
    listsTable.appendChild(list);
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
  let i = +e.target.id - 1;
  lists[i].done = e.target.value === 'isDone' ? true : false;
  if (lists[i].done) e.target.style.textDecoration = 'line-through';
};

getLists();
renderLists();
const addListBtn = document.getElementById('add-list-btn');
addListBtn.addEventListener('click', addList);
