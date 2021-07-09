/**
* @jest-environment jsdom
*/ 
const initStart = require('../src/start');
const project = require('../src/project');

describe('getProjects', () => {
  it('It is expected to populate projects', () => {
    expect(initStart.getProjects()).toEqual([new project.Project('Default'), new project.Project('Yesterday'), new project.Project('Today'), new project.Project('Tomorrow')]);
  });
});