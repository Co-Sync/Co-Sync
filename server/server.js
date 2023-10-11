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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// /**
//  * define route handlers
//  */
app.use('/api/project', projectRouter);
app.use('/api/user', userRouter);

// these two must be in the end
app.use(express.static(path.resolve(__dirname, '../build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

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
