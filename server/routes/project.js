const express = require('express');

const projectController = require('../controllers/ProjectController');

const projectRouter = express.Router();

// get all projects
projectRouter.get('/',
  projectController.getProjects,
  (req, res) => res.status(200).json(res.locals.projects)
);

// get one project
// projectRouter.get('/:projectId',
//   projectController.getOneProject,
//   (req, res) => res.status(200).json(res.locals.project)
// );

// create a project, return created project
projectRouter.post('/',
  projectController.createProject,
  (req, res) => res.status(200).json(res.locals.project)
);

// create a column, return created column
projectRouter.post('/column',
  projectController.createColumn,
  (req, res) => res.status(200).json(res.locals.column)
);

// create a task, return created task
projectRouter.post('/task',
  projectController.createTask,
  (req, res) => res.status(200).json(res.locals.task)
);

// update a task, return updated task
projectRouter.patch('/task',
  projectController.updateTask,
  (req, res) => res.status(200).json(res.locals.task)
);

// delete a project
projectRouter.delete('/',
  projectController.deleteProject,
  (req, res) => res.status(200).message('Project deleted').end()
);

// delete a column
projectRouter.delete('/column',
  projectController.deleteColumn,
  (req, res) => res.status(200).message('Column deleted').end()
);

// delete a task
projectRouter.delete('/task',
  projectController.deleteTask,
  (req, res) => res.status(200).message('Task deleted').end()
);

module.exports = projectRouter;
