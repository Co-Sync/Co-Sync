const Project = require('../models/projectModel');
const mongoose = require('mongoose');

// get all projects
const getProjects = async (req, res) => {
    try {
        const tasks = await Project.find(); 
        res.status(200).json(tasks);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

// Create a new project
const createProject = async (req, res, next) => {
  try {
    const project = {
      projectName: req.body.projectName,
      columns: []
    };
    const savedProject = await Project.create(project);
    console.log(savedProject);
    res.locals.project = savedProject;
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to create new project: ' + err,
      message: { err: 'Failed to create new project' },
    })
  }
};

// Create a new list within a project
const createList = async (req, res) => {

};

// Create a new task within a list
const createTask = async (req, res) => {
  // Requires:
  //   - req.body.projectId
  //   - req.body.columnId
  //   - req.body.taskName
  
  // find the project with project id -- findOne
  // insert a new task in the project's columnId column -- find
  // write the updated project back to db
  try {


    const project = await Project.findOne({
      _id: req.body.projectId
    });
    const newTask = {
      taskName: req.body.taskName,
      taskComments: []
    };
    project.columns[req.body.columnId].tasks.push(newTask)
    await project.save();

    res.locals.task = newTask;
    // res.locals.project = project;

    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to create new task: ' + err,
      message: { err: 'Failed to create new task' },
    })
  }
};

// Update a task within a list
const updateTask = async (req, res) => {

};

// Delete a project (this will delete all lists and tasks within the project)
const deleteProject = async (req, res) => {

};

// Delete a list within a project (this will delete all tasks within the list)
const deleteList = async (req, res) => {

};

// Delete a task within a list
const deleteTask = async (req, res) => {
 
};

module.exports = {
  getProjects,
  createProject,
  createList,
  createTask,
  updateTask,
  deleteProject,
  deleteList,
  deleteTask,
};