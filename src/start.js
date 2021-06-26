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