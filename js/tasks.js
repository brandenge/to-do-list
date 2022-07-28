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
    this.nameCol.addEventListener('click', List.setCurrentList);
    this.nameCol.addEventListener('click', List.animateListName);
    this.nameCol.setAttribute('class', 'list-name');
  }

  static lists = List.getLists();
  static currentListName = localStorage.getItem('current_list_name');
  static currentList = List.lists[List.lists.findIndex(list => list.name === List.currentListName)];

  static getLists() {
    const lists = localStorage.getItem('to_do_lists');
    return lists === null ? [] : JSON.parse(lists);
  }

  static setLists() {
    localStorage.setItem('to_do_lists', JSON.stringify(List.lists));
  }

  static getCurrentListName() {
    const currentList = document.getElementById('current-list-name');
    if (List.lists.length === 0) {
      currentList.innerHTML = 'First create a list on the lists page';
      return;
    }

    if (List.currentListName === null) {
      currentList.innerHTML = List.lists[0].name;
      localStorage.setItem('current_list_name', List.lists[0].name);
      List.currentListName = localStorage.getItem('current_list_name');
    } else {
      currentList.innerHTML = List.currentListName;
    }
  }

  static setCurrentList(e) {
    List.currentListName = e.target.innerHTML;
    document.getElementById('current-list-name').innerHTML = List.currentListName;
    localStorage.setItem('current_list_name', List.currentListName);
    List.currentList = List.lists[List.lists.findIndex(list => list.name === List.currentListName)];
    Task.renderTasks();
  }

  static animateListName() {
    const currentList = document.getElementById('current-list-name');
    currentList.animate({
      backgroundColor: ['#78CE8F', '#CECB78', '#CEA678', '#CE7878', '#CEA678', '#CECB78', '#78CE8F'],
    }, 1000);
  }

  static renderLists() {
    const listsTable = document.getElementById('lists-table');
    listsTable.innerHTML = '<th>#</th><th>List Name</th>';
    for (let i = 0, len = List.lists.length; i < len; i++) {
      const listRow = new List(i);
      listsTable.appendChild(listRow.listRow);
    }
  }
}

class Task {
  constructor(index) {
    this.taskRow = document.createElement('tr');
    this.taskRow.setAttribute('id', `${index + 1}`);
    this.numCol = document.createElement('td');
    this.numCol.innerHTML = `${index + 1}`;
    this.taskRow.appendChild(this.numCol);
    this.nameCol = document.createElement('td');
    this.nameCol.innerHTML = `${List.currentList.tasks[index].name}`;
    this.taskRow.appendChild(this.nameCol);
    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute('type', 'checkbox');
    if (List.currentList.tasks[index].done) {
      this.checkbox.checked = true;
      this.nameCol.style.textDecorationLine = 'line-through';
    }
    this.checkbox.addEventListener('click', Task.isDone);
    this.doneCol = document.createElement('td');
    this.doneCol.appendChild(this.checkbox);
    this.taskRow.appendChild(this.doneCol);
    this.upBtn = document.createElement('input');
    this.upBtn.setAttribute('type', 'button');
    this.upBtn.setAttribute('value', 'Up');
    this.upBtn.addEventListener('click', Task.move);
    this.downBtn = document.createElement('input');
    this.downBtn.setAttribute('type', 'button');
    this.downBtn.setAttribute('value', 'Down');
    this.downBtn.addEventListener('click', Task.move);
    this.moveCol = document.createElement('td');
    this.moveCol.appendChild(this.upBtn);
    this.moveCol.appendChild(this.downBtn);
    this.taskRow.appendChild(this.moveCol);
  }

  static renderTasks() {
    const tasksTable = document.getElementById('tasks-table');
    tasksTable.innerHTML = '<th>#</th><th>Task Name</th><th>Done</th><th>Move Task</th>';
    for (let i = 0, len = List.currentList.tasks.length; i < len; i++) {
      const taskRow = new Task(i);
      tasksTable.appendChild(taskRow.taskRow);
    }
  }

  static add() {
    const newTaskName = document.getElementById('new-task-name');
    if (newTaskName.value.trim() === '') return;
    List.currentList.tasks.push({
      name: newTaskName.value,
      done: false
    });
    List.setLists();
    Task.renderTasks();
    newTaskName.value = '';
  }

  static isDone(e) {
    const i = +e.target.parentNode.parentNode.id - 1;
    List.currentList.tasks[i].done = e.target.checked ? true : false;
    if (List.currentList.tasks[i].done) {
      e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'line-through';
    } else {
      e.target.parentNode.parentNode.children[1].style.textDecorationLine = 'none';
    }
    List.setLists();
  }

  static delete(e) {
    const deleteNum = document.getElementById('delete-task-num');
    const deleteIndex = +deleteNum.value - 1;
    if (deleteIndex < 0 || deleteIndex >= List.currentList.tasks.length) {
      return;
    }
    List.currentList.tasks.splice(deleteIndex, 1);
    List.setLists();
    Task.renderTasks();
    deleteNum.value = '';
  }

  static move(e) {
    const currentIndex = +e.target.parentNode.parentNode.id - 1;
    let newIndex;
    if (e.target.value === 'Up') {
      newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
    } else if (e.target.value === 'Down') {
      newIndex = currentIndex + 1 < List.currentList.tasks.length ? currentIndex + 1 : List.currentList.tasks.length - 1;
    }
    const temp = List.currentList.tasks[newIndex];
    List.currentList.tasks[newIndex] = List.currentList.tasks[currentIndex];
    List.currentList.tasks[currentIndex] = temp;
    List.setLists();
    Task.renderTasks();
  }

  static initializeTasksPage() {
    const addBtn = document.getElementById('add-task-btn');
    addBtn.addEventListener('click', Task.add);
    const deleteBtn = document.getElementById('delete-task-btn');
    deleteBtn.addEventListener('click', Task.delete);
    List.getCurrentListName();
    List.renderLists();
    Task.renderTasks();
  }
}

Task.initializeTasksPage();
