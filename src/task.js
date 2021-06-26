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