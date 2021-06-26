import { displayNav } from './structure';
// eslint-disable-next-line import/no-cycle
import project, { Project, removeProject } from './project';
// eslint-disable-next-line import/no-cycle
import {
  Todo, createTodo, removeTodo, updateStatus,
} from './task';

const container = document.getElementById('content');
