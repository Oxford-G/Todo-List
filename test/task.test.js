const todo = require('../src/task');
const project = require('../src/project');

const todoExample1 = new todo.Todo('title', 'May 1st, 2021', 'description', 'high');

describe('updateTodo', () => {
  it('updateTodo should update a todo', () => {
    todoExample1.updateTodo('title2', 'May 2nd, 2021', 'description2', 'low');
    expect(todoExample1.date).toBe('May 2nd, 2021');
  });
});

const projectExample = new project.Project('projectExample');

const todoExample2 = new todo.Todo('title3', 'May3rd, 2021', 'description3', 'medium');
projectExample.todos.push(todoExample2, todoExample1);
