const cookieController = {};
const User = require('../models/userModel');

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = async (req, res, next) => {
  
  if(res.locals.verifyUser === true){
    const user = await User.findOne({username: req.body.username});
    if(req.cookies.ssid) {
      res.locals.ssid = req.cookies.ssid;
      return next();
    }
    res.cookie('ssid', user._id, {httpOnly: true} )
    res.locals.ssid = user._id;
    req.cookies.ssid = res.locals.ssid;
    return next()
  }
  return next()
}

module.exports = cookieController;
