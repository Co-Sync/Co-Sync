const express = require('express');

const userController = require('../controllers/UserController');

const userRouter = express.Router();

// sign up
  userRouter.post('/signup', 
  userController.createUser,
  (req, res) => res.status(200).json(res.locals.user)
  );

  // log in
  userRouter.post('/login', 
  userController.verifyUser,
  (req, res) => res.status(200).json(res.locals.user)
  );


module.exports = projectRouter;
