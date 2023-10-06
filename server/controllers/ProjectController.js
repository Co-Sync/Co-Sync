const Project = require('../models/projectModel');
const mongoose = require('mongoose');

// get all projects
const getProjects = async (req, res, next) => {
  try {
    const tasks = await Project.find();
    res.locals.projects = tasks;
    res.status(200).json(res.locals.projects);
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to get all projects: ' + error,
      message: { err: 'Failed to get all projects' },
    })
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
      log: 'Failed to create new project: ' + error,
      message: { err: 'Failed to create new project' },
    })
  }
};

// Create a new column within a project
const createColumn = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.body.projectId
    });
    console.log('find project: ', project);
    console.log('find project column: ', project.columns);
    const newColumn = {
      columnName: req.body.columnName,
      tasks: []
    }
    project.columns.push(newColumn);
    // console.log('push project column: ', project.columns);
    await project.save();

    res.locals.column = newColumn;
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: `Failed to create new column: ${error}`,
      status: 500,
      message: { err: 'createColumn middleware is not working correctly.' }
    })
  }

};

// Create a new task within a column
const createTask = async (req, res, next) => {
  // find the project with project id -- findOne
  try {
    const project = await Project.findOne({
      _id: req.body.projectId
    });
    // find column by id;
    let column = {};
    for (let i = 0; i < project.columns.length; i++) {
      if (project.columns[i]._id.toString() === req.body.columnId) {
        column = project.columns[i];
      }
    }
    // console.log('find project: ', project);
    // console.log('find project column: ', column);
    const newTask = {
      taskName: req.body.taskName,
      taskComments: ''
    };
    column.tasks.push(newTask);
    await project.save();

    res.locals.task = newTask;
    // res.locals.project = project;
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to create new task: ' + error,
      message: { error: 'Failed to create new task' },
    })
  }
};

// Update a task within a column
const updateTask = async (req, res, next) => {
  // will need projectId, columnId and taskId in the request body;
  // will also need updatedTask object in the request body;
  try {
    const project = await Project.findOne({
      _id: req.body.projectId
    });
    // console.log("Got Project: ", project);
    // console.log("To find column: ", req.body.columnId);
    // find the column;
    let column = {};
    for (let i = 0; i < project.columns.length; i++) {
      if (project.columns[i]._id.toString() === req.body.columnId) {
        column = project.columns[i];
      }
    }
    // console.log("Got Column: ", column);
    // console.log("To find and update task: ", req.body.taskId);
    // find the task, and update properties;
    for (let i = 0; i < column.tasks.length; i++) {
      if (column.tasks[i]._id.toString() === req.body.taskId) {
        column.tasks[i].taskName = req.body.taskName;
        column.tasks[i].taskComments = req.body.taskComments;
        res.locals.task = column.tasks[i];
        break;
      }
    }
    await project.save();
    // res.locals.project = project;
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to udoate a task: ' + error,
      message: { err: 'Failed to uodated a task' },
    })
  }
};


// Delete a project (this will delete all column and tasks within the project)
const deleteProject = async (req, res, next) => {
  try {
    const projectId = req.body.projectId;
    const project = await Project.findByIdAndRemove(projectId)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    return next();

  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to delete a project: ' + error,
      message: { err: 'Failed to delete a project' },
    })
  }
};

// Delete a column within a project (this will delete all tasks within the column)
const deleteColumn = async (req, res) => {
  // try{
  //   const projectId = req.body.projectId;
  //   const columnId = req.body.columnId;

  //   const project = await Project.findById(projectId);

  //   if (!project){
  //     return res.status(404).json({message: 'Project not found'})
  //   }

  // }
};

// Delete a task within a column
const deleteTask = async (req, res, next) => {
  try {
    const projectId = req.body.projectId;
    const columnId = req.body.columnId;
    const taskId = req.body.taskId;

    // const project = await Project.findByAndUpdate(
    //   projectId,
    //   {$pull: {'columns'}}
    // );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    task.remove();
    await project.save();
    res.json({ message: 'Task deleted' });

  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to delete a task: ' + error,
      message: { err: 'Failed to delete a task' },
    })
  }
};

module.exports = {
  getProjects,
  createProject,
  createColumn,
  createTask,
  updateTask,
  deleteProject,
  deleteColumn,
  deleteTask,
};


/*const project = await project.findByIdAndUpdate({
   projectId,
   {$pull: { 'columns': {_id:columnId}}},
   {new: true}
})*/