const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const userController = {};
userController.userStore = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
}

/**
 * inviteUser - add a user to a project
 * req.body: { username, projectId }
*/
userController.inviteUser = (req, res, next) => {
  const { username, projectID } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return next({
          log: 'User not found',
          status: 400,
          message: { err: 'Error: User not found' }
        });
      } else if (user.projects.includes(projectID)) {
        return next({
          log: 'User already in project',
          status: 400,
          message: { err: 'Error: User already in project' }
        });
      } else {
        User.findOneAndUpdate({ username }, { $push: { projects: projectID } })
          .then(() => next())
          .catch((err) => {
            return next({
              log: 'Error in userController.inviteUser: ' + JSON.stringify(err),
              status: 400,
              message: { err: 'Error: User not found' }
            });
          });
      }
    })
    .catch((err) => {
      return next({
        log: 'Error in userController.inviteUser: ' + JSON.stringify(err),
        status: 400,
        message: { err: 'Error: User not found' }
      });
    });
}

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = async (req, res, next) => {
  // write code here
  // add logic to handle signup using existing username
  try {
    if (req.body.username !== null && req.body.password !== null && req.body.email !== null) {
      await User.create({username: req.body.username, password: req.body.password, email: req.body.email})
      // console.log('newUser is: ', newUser);
      // console.log(`User list is ${res.locals.users}`)
      res.locals.verifyUser = true;
      return next();
    }
  }
  catch (err) {
    // return next(err);
    return next({
      log: 'Failed to create user: ' + err,
      status : 400,
      mesaage: {err: 'Failed to create user.'}
    });
  }
}
// userController.createUser = (req, res, next) => {
//   // write code here
//   //users are an object that contain three properties:
//   //Email, username, and password. These should be in the request body when the request is sent from the frontend
//   console.log(req.body.username);
//   console.log(req.body.password);
//   console.log(req.body.email)

//   if (!req.body.username || !req.body.password) {
//     res.locals.url = '/signup?e=' + encodeURIComponent('Incorrect username or password');
//     return next();
//   }
  
//   //make use of our imported User from userModel to add the information posted by the request
//   //into our database of users

//   User.create({ 
//     username: req.body.username, 
//     password: req.body.password,
//     email: req.body.email
//   })
//     .then(() => res.locals.url = '/home')
//     .then(() => next())
  
//   // return next();    
// };

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = async (req, res, next) => {
  // write code here
  const {username, password} = req.body;
  if (!username || !password) {
    return next({
      log: 'Please enter a username and password',
      status: 400,
      message: { err: 'Error: No username or password'}
    });
  }
  User.findOne({username})
    .then((user) => {
      if(user === null){
        return next({
          log: 'Verification failure',
          status : 401,
          message: {err: 'Username or password is incorrect.'}
        })
      }
      console.log('made it to Bcrypt')
      try {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if(result === false) return next({
              log: 'Verification failure',
              status : 401,
              message: {err: 'Username or password is incorrect.'}
            });
            if(result === true) {
              console.log('Bcrypt compare confirmed');
              res.locals.user = {
                _id: user._id,
                username: user.username,
              }
              console.log('Hi I am the User...', user)
              res.locals.verifyUser = true;
              return next()
            }
          })
      } 
      catch (err) {
        return next(err);
      }
    })

};

userController.getUserProjects = (req, res, next) => {
  const userID = req.cookies.ssid;
  console.log('userID is: ', userID);
  if (!userID) return next({ log: 'Error in userController.getUserProjects: No user ID found', status: 400, message: { err: 'Error: No user ID found' } });
  User.findOne({_id: userID})
    .populate('projects')
    .then((user) => {
      res.locals.user = {projects: user.projects, username: user.username, userId: user._id};
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Failed to find user: ' + userID + ':' + err,
        status : 400,
        mesaage: {err: 'Failed to find user.'}
      });
    })
}

// userController.verifyUser = (req, res, next) => {
//   //store the req.body (which should be an object) in a new constant, then use User.find
//   //to compare the username in the req.body to usernames stored in the database.
//   const credentials = req.body;
//   console.log(credentials);
 

//User.find expects an object as an argument. Code breaks if it is not an object
//   User.findOne({ username: credentials.username })
//     .then ((user) => {
//       if (user.username === null || user.password === null){
//         //redirect to /signup if the user doesn't exist
//         console.log('user was not found')
//         res.redirect('/signup');
//         // res.locals.url = '/signup';`
//       }
//       else {
//         bcrypt
//         .compare(user.password, credentials.password)
//         .then((result) => {
//           if(result === false) res.redirect('/signup')
//           if(result === true) {
//             console.log('Bcrypt compare confirmed');
//             res.locals.verifyUser = true;
//           }
//       })
//         // console.log(user);
//         // res.locals._id = user._id.toString();
//         // //redirect to the homepage
//         // res.locals.url = '/home';
//       }
//     })
//     //reminder: if using asynchronous functions, the next() must be part of said function using .then.
//     //otherwise, it will skip everything since it is synchronous
//     .then (() => next());
// };

module.exports = userController;
