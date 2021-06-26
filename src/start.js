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