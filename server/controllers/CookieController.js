const cookieController = {};
const User = require('../models/userModel');

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = async (req, res, next) => {
  // write code here
  if(res.locals.verifyUser === true){
    // console.log('goes into the cookie middleware');
    const user = await User.findOne({username: req.body.username});
    if(req.cookies.ssid) {
      res.locals.ssid = req.cookies.ssid;
      return next();
    }
    res.cookie('ssid', user._id, {httpOnly: true} )
    res.locals.ssid = user._id;
    req.cookies.ssid = res.locals.ssid;
    console.log('setcookie cookie', res.locals.ssid)
    // console.log('ssid stored in cookie middleware');
    return next()
  }
  console.log('did not go into cookie middleware');
  return next()
}

module.exports = cookieController;
