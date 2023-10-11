const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const userController = require('../controllers/UserController');
const cookieController = require('../controllers/CookieController');
const sessionController = require('../controllers/SessionController');

const userRouter = express.Router();


/**
* signup
*/
// userRouter.get('/signup', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });
userRouter.post('/signup', userController.createUser , cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  // what should happen here on successful sign up?
  res.status(200).end();
});


/**
* login
*/
userRouter.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  // what should happen here on successful log in?
  res.status(200).end();
});

userRouter.get('/validate', sessionController.isLoggedIn, (req, res) => {
  res.status(200).end();
});

module.exports = userRouter;
