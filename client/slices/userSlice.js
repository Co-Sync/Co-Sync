import { createSlice } from '@reduxjs/toolkit';
// see more at https://redux-toolkit.js.org/tutorials/quick-start

const initialState = {
  username: '',
  projects: {
    project1: {
      columns: [
        {
          columnName: 'column1',
          tasks: [{ taskName: 'task1', taskComments: '' }],
        },
      ],
    },
  },
  numOfProjects: 1,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setState: (state, action) => {
      state = { ...state, ...action.payload };
    },
    addTask: (state, action) => {
      let outerIndx = 0;
      const { projectName, columnName, task } = action.payload;
      //if find doesnt work, try to use findIndex or indexOf to access column obj
      const columnCopy = { ...state.projects[projectName].columns.find((column, indx) => { column.columnName === columnName; outerIndx = indx; }) };
      columnCopy.tasks.push(task);
      state.projects[projectName].columns[outerIndx] = columnCopy;
    },
    addProject: (state, action) => {
      const { projectName } = action.payload;
      //if the proj name doesnt exist, add a new property to the projects obj with clean slate
      if (!state.projects[projectName]) {
        state.projects[projectName] = {
          columns: [],
        };
        state.numOfProjects++;
      }
    },
    deleteTask: (state, action) => {
      let outerIndx = 0;
      const { projectName, columnName, taskToDelete } = action.payload;
      //find the column by accessing projects, [projectname], columns
      const column = state.projects[projectName].columns
        .find((column, indx) => {
          column.columnName === columnName;
          outerIndx = indx;
        });

      //OR iterate over the arr and push values that ARE NOT taskTo
      if (column) {
        //find index of the task to delete
        const taskIndex = column.tasks.findIndex((task) => task.taskName === taskToDelete);
        //if the tasks exist, use that index to delete it from the arr using splice
        if (taskIndex !== -1) {
          const spliced = column.tasks.toSpliced(taskIndex, 1);
          const newColumn = { ...column, tasks: spliced }
          state.projects[projectName].columns[outerIndx] = newColumn;
        }
      }
    }
    //movetask
    //editttask later
  },
});

// Action creators are generated for each case reducer function
export const { setState, addTask, addProject, deleteTask } = userSlice.actions;

export default userSlice.reducer;
