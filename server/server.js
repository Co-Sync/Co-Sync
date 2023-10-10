// require('dotenv').config();

const dotenv = require('dotenv');

dotenv.config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


const app = express();

const projectRouter = require('./routes/project');
// const userRouter = require('./routes/user');
const userRouter = require('./routes/user');

app.use(cookieParser());
// const mongoURI = 'mongodb://localhost/coSyncTest';
// mongoose.connect(mongoURI);
/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));



// /**
//  * define route handlers
//  */
app.use('/api/project', projectRouter);
app.use('/api/user', userRouter);




// these two must be in the end
app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & Server listening on port: ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  })


module.exports = app;
