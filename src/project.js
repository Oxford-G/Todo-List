// eslint-disable-next-line import/no-cycle
import { getProjects, start } from './start';

class Project {
  constructor(name) {
    this.name = name;
    this.id = name.toLowerCase();
    this.todos = [];
  }
}