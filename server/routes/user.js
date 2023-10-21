const express = require('express');
const userController = require('../controllers/UserController');
const cookieController = require('../controllers/CookieController');
const sessionController = require('../controllers/SessionController');

const userRouter = express.Router();

userRouter.get('/projects', userController.getUserProjects, (req, res) => {
  res.status(200).json(res.locals.user);
});

/**
* invite a user to a project
* req.body: { username, projectId }
*/
userRouter.post('/invite', userController.inviteUser, (req, res) => {
  res.status(200).end();
});

/**
* signup
*/
userRouter.post('/signup', userController.createUser , cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  res.status(200).end();
});

/**
* login
*/
userRouter.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  res.status(200).json(res.locals.user);
});

userRouter.get('/logout', sessionController.isLoggedIn, sessionController.endSession, (req, res) => {
  res.status(200).json({ message: 'logged out' });
});

/**
 * validate session
*/

userRouter.get('/validate', sessionController.isLoggedIn, (req, res) => {
  res.status(200).end();
});

module.exports = userRouter;
