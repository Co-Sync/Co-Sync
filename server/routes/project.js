const express = require('express');

const projectController = require('../controllers/ProjectController');
const sessionController = require('../controllers/SessionController');

const projectRouter = express.Router();

// get all projects
// returns a json object which is an array of all existing projects.
projectRouter.get('/',
  // sessionController.isLoggedIn,
  projectController.getProjects,
  (req, res) => res.status(200).json(res.locals.projects)
);

// create a project
// req.body: a json object with the following fields:
//   - projectName
// returns a json object of the created project.
projectRouter.post('/',
  // sessionController.isLoggedIn,
  projectController.createProject,
  (req, res) => res.status(200).json(res.locals.project)
);

// create a column
// req.body: a json object with the following fields:
//   - projectId
//   - columnName
// returns a json object of the created column.
projectRouter.post('/column',
  // sessionController.isLoggedIn,
  projectController.createColumn,
  (req, res) => res.status(200).json(res.locals.column)
);

// change a task from one column to another
// req.body: a json object with the following fields:
//   - projectId
//   - old columnId
//   - old columnId
//   - taskId
// returns a 200 status with success message.
projectRouter.patch('/column',
  // sessionController.isLoggedIn,
  projectController.changeColumn,
  (req, res) => res.status(200).end()
);

// create a task
// req.body: a json object with the following fields:
//   - projectId
//   - columnId
//   - taskName
// returns a json object of the created task.
projectRouter.post('/task',
  // sessionController.isLoggedIn,
  projectController.createTask,
  (req, res) => res.status(200).json(res.locals.task)
);

// update a task
// req.body: a json object with the following fields:
//   - projectId
//   - columnId
//   - taskId
//   - taskName
//   - taskComments
// returns a json object of the created task.
projectRouter.patch('/task',
  // sessionController.isLoggedIn,
  projectController.updateTask,
  (req, res) => res.status(200).json(res.locals.task)
);

// delete a project
// req.params.projectId: the projectId to delete;
// returns a 200 status with a success message.
projectRouter.delete('/:projectId',
  // sessionController.isLoggedIn,
  projectController.deleteProject,
  (req, res) => {
    res.statusMessage = 'Project deleted';
    res.status(200).end();
  }
);

// delete a column
// req.params:
//   - projectId
//   - columnId
// returns a 200 status with a success message.
projectRouter.delete('/column/:projectId/:columnId',
  // sessionController.isLoggedIn,
  projectController.deleteColumn,
  (req, res) => {
    res.statusMessage = 'Column deleted';
    res.status(200).end();
  }
);

// delete a task
// req.params:
//   - projectId
//   - columnId
//   - taskId
// returns a 200 status with a success message.
projectRouter.delete('/task/:projectId/:columnId/:taskId',
// sessionController.isLoggedIn,
  projectController.deleteTask,
  (req, res) => {
    res.statusMessage = 'Task deleted';
    res.status(200).end();
  }
);

module.exports = projectRouter;
