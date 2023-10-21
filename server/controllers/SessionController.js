const Session = require('../models/sessionModel');

const SessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
SessionController.isLoggedIn = async (req, res, next) => {
  // write code here
  const session = await Session.find({});
  if ('ssid' in req.cookies && session.length !== 0) {
    return next();
  } else {
    console.log('ssid', req.cookies, 'session', session)
    return next({
      log: 'Session is over ',
      message: { err: 'Session is over' }
    })
  }
};

/**
* startSession - create and save a new Session into the database.
*/
SessionController.startSession = async (req, res, next) => {
  //write code here
  console.log('made it to startSession middleware');
  
  //create a session.find
  const session = await Session.findOne({cookieId: res.locals.ssid});
  if (session) {
    return next();
  } else {
    await Session.create({cookieId: res.locals.ssid})
    console.log('session cookie', res.locals.ssid)
    console.log('session created');
    return next();
  }
};

SessionController.endSession = async (req, res, next) => {
  //write code here
  console.log('made it to endSession middleware');
  const session = await Session.findOne({cookieId: req.cookies?.ssid});
  if (session) {
    await Session.deleteOne({cookieId: res.locals.ssid});
    console.log('session deleted');
    // to remove a cookie from the browser
    // set expires to a date in the past
    res.clearCookie('ssid');
    return next();
  } else {
    return next({
      log: 'Session does not exist',
      message: { err: 'Session does not exist' }
    })
  }
}

module.exports = SessionController;
