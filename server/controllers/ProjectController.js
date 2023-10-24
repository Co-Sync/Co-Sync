const Project = require('../models/projectModel');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');

// get all projects
const getProjects = async (req, res, next) => {
  try {
    const tasks = await Project.find();
    res.locals.projects = tasks;
    // res.status(200).json(res.locals.projects);
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to get all projects: ' + error,
      message: { err: 'Failed to get all projects' },
    })
  }
};

// Create a new project
const createProject = async (req, res, next) => {
  const userID = req.cookies.ssid;
  try {
    const project = {
      projectName: req.body.projectName,
      owner: userID,
      columns: []
    };
    const savedProject = await Project.create(project);
    const savedProjectID = savedProject._id;
    await User.findByIdAndUpdate(userID, { $push: { projects: savedProjectID } }, { new: true });
    res.locals.project = savedProject;
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to create new project: ' + error,
      message: { err: 'Failed to create new project' },
    })
  }
};

// Create a new column within a project
const createColumn = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.body.projectId
    });
    if (!project) {
      return next({
        status: 404,
        log: 'project does not exist. ',
        message: { err: 'project does not exist.' },
      });
    }
    const newColumn = {
      columnName: req.body.columnName,
      tasks: []
    }
    project.columns.push(newColumn);
    // console.log('push project column: ', project.columns);
    const updatedProject = await project.save();

    res.locals.column = updatedProject.columns[updatedProject.columns.length - 1];
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: `Failed to create new column: ${error}`,
      status: 500,
      message: { err: 'createColumn middleware is not working correctly.' }
    })
  }

};

// Change a task from one column to another (eg. drag and drop one task from "To-do" to "Doing")
const changeColumn = async (req, res, next) => {
  const { projectId, oldColumnId, newColumnId, taskId } = req.body;
  try {
    const project = await Project.findOne({
      _id: projectId
    })
    if (!project) {
      return next({
        status: 404,
        log: 'project does not exist. ',
        message: { err: 'project does not exist.' },
      });
    }
    // find column by id;
    let column;
    for (let i = 0; i < project.columns.length; i++) {
      if (project.columns[i]._id.toString() === oldColumnId) {
        column = project.columns[i];
        break;
      }
    }
    if (!column) {
      return next({
        status: 404,
        log: 'column does not exist. ',
        message: { err: 'column does not exist.' },
      });
    }

    // find the task inside the column, slice this from the tasks array
    let task;
    let taskIndex;
    for (let i = 0; i < column.tasks.length; i++) {
      if (column.tasks[i]._id.toString() === taskId) {
        task = column.tasks[i];
        // console.log('task', task);
        taskIndex = i;
        break;
      }
    }
    column.tasks.splice(taskIndex, 1);

    // go into the newColumn with newColumnId, and then push it into the newColumn array
    // let newColumn;
    // let newColumnIndex;

    for (let i = 0; i < project.columns.length; i++) {
      if (project.columns[i]._id.toString() === newColumnId) {
        const newTask = { taskName: task.taskName, taskComments: task.taskComments, _id: task._id };
        project.columns[i].tasks.push(newTask);
        // newColumn = project.columns[i];
        break;
      }
    }

    await project.save();
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: `Failed to change a task from one column to another column: ${error}`,
      status: 500,
      message: { err: 'changeColumn middleware is not working correctly.' }
    })
  }

};

// Create a new task within a column
const createTask = async (req, res, next) => {
  // find the project with project id -- findOne

  try {
    const project = await Project.findOne({
      _id: req.body.projectId
    });
    if (!project) {
      return next({
        status: 404,
        log: 'project does not exist. ',
        message: { err: 'project does not exist.' },
      });
    }
    // find column by id;
    let column;
    let columnIndex;
    for (let i = 0; i < project.columns.length; i++) {
      if (project.columns[i]._id.toString() === req.body.columnId) {
        column = project.columns[i];
        columnIndex = i;
        break;
      }
    }
    if (!column) {
      return next({
        status: 404,
        log: 'column does not exist. ',
        message: { err: 'column does not exist.' },
      });
    }
    const newTask = {
      taskName: req.body.taskName,
      taskComments: ''
    };
    column.tasks.push(newTask);
    const updatedProject = await project.save();

    res.locals.task = updatedProject.columns[columnIndex].tasks[updatedProject.columns[columnIndex].tasks.length - 1];
    // res.locals.project = project;
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to create new task: ' + error,
      message: { error: 'Failed to create new task' },
    })
  }
};

// Update a task within a column
const updateTask = async (req, res, next) => {
  // will need projectId, columnId and taskId in the request body;
  // will also need updatedTask object in the request body;
  try {
    const project = await Project.findOne({
      _id: req.body.projectId
    });
    if (!project) {
      return next({
        status: 404,
        log: 'project does not exist. ',
        message: { err: 'project does not exist.' },
      });
    }
    // console.log("Got Project: ", project);
    // console.log("To find column: ", req.body.columnId);
    // find the column;
    let column;
    for (let i = 0; i < project.columns.length; i++) {
      if (project.columns[i]._id.toString() === req.body.columnId) {
        column = project.columns[i];
        break;
      }
    }
    if (!column) {
      return next({
        status: 404,
        log: 'column does not exist. ',
        message: { err: 'column does not exist.' },
      });
    }
    // console.log("Got Column: ", column);
    // console.log("To find and update task: ", req.body.taskId);
    // find the task, and update properties;
    let task;
    for (let i = 0; i < column.tasks.length; i++) {
      if (column.tasks[i]._id.toString() === req.body.taskId) {
        task = column.tasks[i];
        break;
      }
    }
    if (!task) {
      return next({
        status: 404,
        log: 'task does not exist. ',
        message: { err: 'task does not exist.' },
      });
    }
    task.taskName = req.body.taskName;

    console.log(task.taskComments)
    // each new comment adds new property to taskComments object
    let num = Object.keys(task.taskComments).length
    task.taskComments[num] = req.body.taskComments;

    console.log(task.taskComments)
    await project.save();

    res.locals.task = task;
    // res.locals.project = project;
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to udoate a task: ' + error,
      message: { err: 'Failed to updated a task' },
    })
  }
};


// Delete a project (this will delete all column and tasks within the project)
const deleteProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findByIdAndRemove(projectId)
    console.log('removed project: ', project);

    if (!project) {
      return next({
        status: 404,
        log: 'project does not exist. ',
        message: { err: 'project does not exist.' },
      })
    }

    return next();

  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to delete a project: ' + error,
      message: { err: 'Failed to delete a project' },
    })
  }
};

// Delete a column within a project (this will delete all tasks within the column)
const deleteColumn = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const columnId = req.params.columnId;

    let result = await Project.updateOne(
      { _id: projectId },
      { $pull: { columns: { _id: columnId } } }
    )
    // console.log("result: ", result);
    if (result.modifiedCount < 1) {
      return next({
        status: 404,
        log: 'project or column does not exist. ',
        message: { err: 'project or column does not exist.' },
      })
    }
    return next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to delete a column: ' + error,
      message: { err: 'Failed to delete a column' },
    })
  }
};

// Delete a task within a column
const deleteTask = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const columnId = req.params.columnId;
    const taskId = req.params.taskId;

    const project = await Project.findOne({
      _id: projectId
    });
    if (!project) {
      return next({
        status: 404,
        log: 'project does not exist. ',
        message: { err: 'project does not exist.' },
      });
    }
    // find column by id;
    let column;
    let columnIndex;
    for (let i = 0; i < project.columns.length; i++) {
      if (project.columns[i]._id.toString() === columnId) {
        column = project.columns[i];
        columnIndex = i;
        break;
      }
    }
    if (!column) {
      return next({
        status: 404,
        log: 'column does not exist. ',
        message: { err: 'column does not exist.' },
      });
    }

    let taskIndex;
    for (let i = 0; i < column.tasks.length; i++) {
      if (column.tasks[i]._id.toString() === taskId) {
        taskIndex = i;
        break;
      }
    }
    if (taskIndex === undefined) {
      return next({
        status: 404,
        log: 'task does not exist. ',
        message: { err: 'task does not exist.' },
      });
    }
    column.tasks.splice(taskIndex, 1);
    await project.save();
    return next();

    // The following code uses poll on a nested array.
    // let conditionObj = {};
    // conditionObj["columns." + columnIndex + ".tasks._id"] = taskId;
    // let result = await Project.updateOne(
    //   { _id: projectId },
    //   { $pull: conditionObj }
    // )
    // if (result.modifiedCount < 1) {
    //   return next({
    //     status: 404,
    //     log: 'task does not exist. ',
    //     message: { err: 'task does not exist.' },
    //   })
    // }

  } catch (error) {
    console.log(error);
    next({
      log: 'Failed to delete a task: ' + error,
      message: { err: 'Failed to delete a task' },
    })
  }
};

module.exports = {
  getProjects,
  createProject,
  createColumn,
  changeColumn,
  createTask,
  updateTask,
  deleteProject,
  deleteColumn,
  deleteTask,
};