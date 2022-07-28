class List {
  constructor(index) {
    this.listRow = document.createElement('tr');
    this.listRow.setAttribute('id', `${index + 1}`);
    this.numCol = document.createElement('td');
    this.numCol.innerHTML = `${index + 1}`;
    this.listRow.appendChild(this.numCol);
    this.nameCol = document.createElement('td');
    this.nameCol.innerHTML = List.lists[index].name;
    this.listRow.appendChild(this.nameCol);
    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute('type', 'checkbox');
    if (List.lists[index].done) {
      this.checkbox.checked = true;
      this.nameCol.style.textDecorationLine = 'line-through';
    }
    this.checkbox.addEventListener('click', List.isDone);
    this.doneCol = document.createElement('td');
    this.doneCol.appendChild(this.checkbox);
    this.listRow.appendChild(this.doneCol);
    this.upBtn = document.createElement('input');
    this.upBtn.setAttribute('type', 'button');
    this.upBtn.setAttribute('value', 'Up');
    this.upBtn.addEventListener('click', List.move);
    this.downBtn = document.createElement('input');
    this.downBtn.setAttribute('type', 'button');
    this.downBtn.setAttribute('value', 'Down');
    this.downBtn.addEventListener('click', List.move);
    this.moveCol = document.createElement('td');
    this.moveCol.appendChild(this.upBtn);
    this.moveCol.appendChild(this.downBtn);
    this.listRow.appendChild(this.moveCol);
  }

  static lists = List.getLists();


  static getLists() {
    const lists = localStorage.getItem('to_do_lists');
    return lists === null ? [] : JSON.parse(lists);
  }

  static setLists() {
    localStorage.setItem('to_do_lists', JSON.stringify(List.lists));
  }

  static renderLists() {
    const listsTable = document.getElementById('lists-table');
    listsTable.innerHTML = '<th>#</th><th>List Name</th><th>Done</th><th>Move List</th>';
    for (let i = 0, len = List.lists.length; i < len; i++) {
      const listRow = new List(i);
      listsTable.appendChild(listRow.listRow);
    }
  }

  static add() {
    const newListName = document.getElementById('new-list-name');
    if (newListName.value.trim() === '') return;
    List.lists.push({
      name: newListName.value,
      done: false,
      tasks: []
    });
    List.setLists();
    List.renderLists();
    newListName.value = '';
  }

  static isDone(e) {
    const i = +e.target.parentNode.parentNode.id - 1;
    List.lists[i].done = e.target.checked ? true : false;
    if (List.lists[i].done) {
      e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'line-through';
    } else {
      e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'none';
    }
    List.setLists();
  }

  static delete(e) {
    let deleteNum = document.getElementById('delete-list-num');
    const deleteIndex = +deleteNum.value - 1;
    if (deleteIndex < 0 || deleteIndex >= List.lists.length) {
      return;
    }
    List.lists.splice(deleteIndex, 1);
    List.setLists();
    List.renderLists();
    deleteNum.value = '';
  }

  static move(e) {
    const currentIndex = +e.target.parentNode.parentNode.id - 1;
    let newIndex;
    if (e.target.value === 'Up') {
      newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
    } else if (e.target.value === 'Down') {
      newIndex = currentIndex + 1 < List.lists.length ? currentIndex + 1 : List.lists.length - 1;
    }
    const temp = List.lists[newIndex];
    List.lists[newIndex] = List.lists[currentIndex];
    List.lists[currentIndex] = temp;
    List.setLists();
    List.renderLists();
  }

  static initializeListsPage() {
    const addBtn = document.getElementById('add-list-btn');
    addBtn.addEventListener('click', List.add);
    const deleteBtn = document.getElementById('delete-list-btn');
    deleteBtn.addEventListener('click', List.delete);
    List.renderLists();
  }
}

List.initializeListsPage();
