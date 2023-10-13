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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// /**
//  * define route handlers
//  */
app.use('/api/project', projectRouter);
app.use('/api/user', userRouter);

app.use('/assets', (req, res, next) => {
  const filePath = path.resolve(__dirname, '../assets', req.url.slice(1));
  if (path.extname(filePath) === '.svg') {
    res.header('Content-Type', 'image/svg+xml');
  }
  next();
});

// serve the 'assets' directory
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

// these two must be in the end
app.use(express.static(path.resolve(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.use((req, res) => res.sendStatus(404));

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