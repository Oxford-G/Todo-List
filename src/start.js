import { displayNav } from './structure';
// eslint-disable-next-line import/no-cycle
import project, { Project, removeProject } from './project';
// eslint-disable-next-line import/no-cycle
import {
  Todo, createTodo, removeTodo, updateStatus,
} from './task';

const container = document.getElementById('content');

const predefinedProjects = [new Project('Default'), new Project('Yesterday'), new Project('Today'), new Project('Tomorrow')];
function getProjects() {
  if (localStorage.getItem('toDoProjects')) {
    const projects = JSON.parse(localStorage.getItem('toDoProjects'));
    for (let i = 0; i < projects.length; i += 1) {
      Object.setPrototypeOf(projects[i], Project.prototype);
      const todoList = projects[i].todos;
      for (let i = 0; i < todoList.length; i += 1) {
        Object.setPrototypeOf(todoList[i], Todo.prototype);
      }
    }
    return projects;
  }
  return predefinedProjects;
}

function clearContent(element) {
  element.textContent = '';
}

function displayProjects() {
  const projectsList = document.querySelector('.project-list');
  clearContent(projectsList);
  let selectedProjectId = localStorage.getItem('selectedProjectId');
  const projects = getProjects();

  projects.forEach((project) => {
    const projectItem = projectsList.appendChild(document.createElement('h6'));
    projectItem.textContent = project.name;
    projectItem.setAttribute('id', project.id);
    projectItem.addEventListener('click', () => {
      selectedProjectId = project.id;
      localStorage.selectedProjectId = project.id;

      // eslint-disable-next-line no-use-before-define
      displayTodos(selectedProjectId);
    });
  });
  // eslint-disable-next-line no-use-before-define
  displayTodos(selectedProjectId);
}

function displayTodoForm() {
  const projectContainer = document.querySelector('.project-container');
  clearContent(projectContainer);
  const todoForm = projectContainer.appendChild(document.createElement('form'));
  todoForm.setAttribute('class', ' mx-auto mt-3 todo-form');

  const titleLabel = todoForm.appendChild(document.createElement('label'));
  titleLabel.setAttribute('class', 'form-label');
  titleLabel.innerHTML = 'Title';

  const titleInput = todoForm.appendChild(document.createElement('input'));
  titleInput.setAttribute('class', 'form-control todo-title w-50');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('placeholder', '   Todo title ');

  const dateLabel = todoForm.appendChild(document.createElement('label'));
  dateLabel.setAttribute('class', 'form-label');
  dateLabel.innerHTML = 'Date';

  const dateInput = todoForm.appendChild(document.createElement('input'));
  dateInput.setAttribute('class', 'form-control todo-date w-50');
  dateInput.setAttribute('type', 'date');

  const descriptionLabel = todoForm.appendChild(document.createElement('label'));
  descriptionLabel.setAttribute('class', 'form-label mt-3');
  descriptionLabel.innerHTML = 'Description';

  const descriptionArea = todoForm.appendChild(document.createElement('textarea'));
  descriptionArea.setAttribute('class', 'form-control mt-2 todo-description w-75');
  descriptionArea.setAttribute('placeholder', '     Add Todo description');

  const priorityLabel = todoForm.appendChild(document.createElement('label'));
  priorityLabel.setAttribute('class', 'form-label mt-3');
  priorityLabel.innerHTML = 'Select Priority';

  const prioritySelectTag = todoForm.appendChild(document.createElement('select'));
  prioritySelectTag.setAttribute('class', 'form-select priority-select w-50');

  const priorities = ['High', 'Medium', 'Low'];
  priorities.forEach((priority) => {
    const option = prioritySelectTag.appendChild(document.createElement('option'));
    option.setAttribute('value', priority);
    option.innerHTML = priority;
  });

  const projectLabel = todoForm.appendChild(document.createElement('label'));
  projectLabel.setAttribute('class', 'form-label project-select-label mt-3');
  projectLabel.innerHTML = 'Select Project';

  const projectSelectTag = todoForm.appendChild(document.createElement('select'));
  projectSelectTag.setAttribute('class', 'w-50 project-select form-select');
  const projects = getProjects();
  const selectedProjectId = localStorage.getItem('selectedProjectId');

  if (selectedProjectId) {
    const option = projectSelectTag.appendChild(document.createElement('option'));
    const project = projects.find((element) => element.id === selectedProjectId);
    option.setAttribute('value', project.name);
    option.innerHTML = project.name;
  } else {
    for (let i = 0; i < projects.length; i += 1) {
      const option = projectSelectTag.appendChild(document.createElement('option'));
      option.setAttribute('value', projects[i].name);
      option.innerHTML = projects[i].name;
    }
  }

  const buttons = projectContainer.appendChild(document.createElement('p'));
  buttons.setAttribute('class', 'd-flex justify-content-between mt-4 w-75 mx-auto todo-buttons');
  const createTodoBtn = buttons.appendChild(document.createElement('button'));
  createTodoBtn.setAttribute('class', 'btn btn-info create-todo');
  createTodoBtn.innerHTML = 'Create Todo';

  createTodoBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const date = dateInput.value;
    const description = descriptionArea.value;
    const priority = prioritySelectTag.value;
    const project = projectSelectTag.value;
    createTodo(title, date, description, priority, project);
  });

  const cancelTodoBtn = buttons.appendChild(document.createElement('button'));
  cancelTodoBtn.setAttribute('class', 'btn btn-danger cancel-todo');
  cancelTodoBtn.innerHTML = 'Cancel';
  cancelTodoBtn.addEventListener('click', displayProjects);
}