const Notification = require('../models/notificationModel');

const NotificationController = {

  getNotifications: async (req, res, next) => { 
    try {
      console.log('getNotifications');
      console.log(req.cookies)
      const { ssid: userId } = req.cookies;

      const userNotifications = await Notification.find({ userId }).sort({ createdAt: -1 });

      res.locals.notifications = userNotifications;

      next()
      
    } catch (error) {
      return next({
        log: 'NotificationController.getNotifications',
        status: error.status || 500,
        message: error.message || { err: 'Unknown error' }
      })
    }
  }
}; 

module.exports = NotificationController;