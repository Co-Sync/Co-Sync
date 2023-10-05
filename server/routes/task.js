const express = require('express');

const starWarsController = require('../controllers/starWarsController');

const taskRouter = express.Router();

taskRouter.get('/',
  taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.getTasks)
);

taskRouter.get('/',
  taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.getTasks)
);

router.get('/homeworld',
  starWarsController.getHomeworld,
  (req, res) => res.status(200).json(res.locals.planet)
);

router.get('/film',
  starWarsController.getFilm,
  (req, res) => res.status(200).json(res.locals.film)
);

router.post('/character',
  starWarsController.addCharacter,
  (req, res) => res.status(200).json({})
);

module.exports = taskRouter;
