// eslint-disable-next-line import/no-cycle
import { getProjects, start } from './start';

class Todo {
  constructor(title, date, description, priority, project) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.priority = priority;
    this.project = project;
    this.id = Date.now().toString();
    this.status = false;
  }

  updateTodo(title, date, description, priority) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.priority = priority;
    return this;
  }
}

function removeTodo(projects, project, todoId) {
  project.todos = project.todos.filter((x) => x.id !== todoId);
  localStorage.toDoProjects = JSON.stringify(projects);
}

function updateStatus(projects, project, id) {
  for (let i = 0; i < project.todos.length; i += 1) {
    if (project.todos[i].id === id && project.todos[i].status === true) {
      project.todos[i].status = false;
    } else if (project.todos[i].id === id && project.todos[i].status === false) {
      project.todos[i].status = true;
    }
  }

  localStorage.toDoProjects = JSON.stringify(projects);
}
