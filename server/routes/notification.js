const express = require('express');
const Router = express.Router();
const NotificationController = require('../controllers/NotificationController');

Router.get('/', NotificationController.getNotifications, (req, res) => {
  return res.status(200).json(res.locals.notifications);
}); 

module.exports = Router;