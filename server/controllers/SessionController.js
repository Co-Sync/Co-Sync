const Session = require('../models/sessionModel');

const SessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
SessionController.isLoggedIn = async (req, res, next) => {
  // write code here
  const session = await Session.find({});
  console.log('session is: ', session);
  if ('ssid' in req.cookies && session.length !== 0) {
    return next();
  } else {
    // res.redirect('/login')
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
  const newSession = await Session.create({cookieId: res.locals.ssid})
  console.log('session created');
  // console.log(newSession);
  return next();

};

module.exports = SessionController;
