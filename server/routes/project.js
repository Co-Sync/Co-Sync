const express = require('express');

const starWarsController = require('../controllers/starWarsController');

const projectRouter = express.Router();

projectRouter.get('/',
  projectController.getTasks,
  (req, res) => res.status(200).json(res.locals.getTasks)
);

projectRouter.patch('/',
  projectController.updateTasks,
  (req, res) => res.status(200).json(res.locals.updateTasks)
);

projectRouter.delete('/',
  projectController.deleteTasks,
  (req, res) => res.status(200).json(res.locals.deleteTasks)
);

projectRouter.put('/',
  projectController.changeList,
  (req, res) => res.status(200).json(res.locals.deleteTasks)
);



module.exports = taskRouter;
