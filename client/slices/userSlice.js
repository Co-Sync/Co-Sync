import { createSlice } from '@reduxjs/toolkit';
// see more at https://redux-toolkit.js.org/tutorials/quick-start

const initialState = {
  username: '',
  projects: {
    project1: {
      columns: [
        {},
      ],
    },
  },
  numOfProjects: 1,
  currentProject: 'project1'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setState: (state, action) => {
      return action.payload;
    },
    createTask: (state, action) => {
      const { columnName, task } = action.payload;
      const currentProject = state.currentProject;
      console.log(task);
      state.projects[currentProject].columns = state.projects[currentProject].columns.map(el => {
        if (el.columnName === columnName) {
          el.tasks.push({taskName: task, taskComments: []});
        }
        return el;
      });
    },
    //need to check
    createColumn: (state, action) => {
      const columnName = action.payload;
      console.log(columnName)
      const currentProject = state.currentProject;
      if (!state.projects[currentProject].columns.find((column) => column.columnName === columnName)) {
        state.projects[currentProject].columns.push({
          columnName,
          tasks: [],
        });
      }
    },
    //need to check
    createProject: (state, action) => {
      const { projectName } = action.payload;
      if (!state.projects[projectName]) {
        state.projects[projectName] = {
          columns: [],
        };
        state.currentProject = projectName;
        state.numOfProjects++;
      }
    },
    //need to check
    updateTask: (state, action) => {
      const { updateTask, taskName, columnName } = action.payload;
      let outerIndx = 0;
      const currentProject = state.currentProject;
      const column = state.projects[currentProject].columns.find(
        (column, indx) => {
          column.columnName === columnName;
          outerIndx = indx;
        }
      );

      //OR iterate over the arr and push values that ARE NOT taskTo
      if (column) {
        const taskIndex = column.tasks.findIndex(
          (task) => task.taskName === taskName
        );
        if (taskIndex !== -1) {
          const newColumn = { ...column, tasks: updateTask };
          state.projects[currentProject].columns[outerIndx] = newColumn;
        }
      }
    },
    //need to check
    deleteProject: (state, action) => {
      const { projectName } = action.payload;
      for (const proj in state.projects) {
        if (proj === state.projects[projectName]) {
          delete state.projects[projectName];
        }
      }
      state.numOfProjects--;
    },
    deleteColumn: (state, action) => {
      let outerIndx = 0;
      const { columnName } = action.payload;
      const currentProject = state.currentProject;
      const column = state.projects[currentProject].columns.find(
        (column, indx) => {
          column.columnName === columnName;
          outerIndx = indx;
        }
      );

      if (column) {
        delete state.projects[currentProject].columns[outerIndx];
      }
    },
    deleteTask: (state, action) => {
      let outerIndx = 0;
      const { columnName, taskToDelete } = action.payload;
      const currentProject = state.currentProject;
      //find the column by accessing projects, [projectname], columns
      const column = state.projects[currentProject].columns.find(
        (column, indx) => {
          column.columnName === columnName;
          outerIndx = indx;
        }
      );

      //OR iterate over the arr and push values that ARE NOT taskTo
      if (column) {
        //find index of the task to delete
        const taskIndex = column.tasks.findIndex(
          (task) => task.taskName === taskToDelete
        );
        //if the tasks exist, use that index to delete it from the arr using splice
        if (taskIndex !== -1) {
          const spliced = column.tasks.toSpliced(taskIndex, 1);
          const newColumn = { ...column, tasks: spliced };
          state.projects[currentProject].columns[outerIndx] = newColumn;
        }
      }
    },
    moveTask: (state, action) => {
      const { columnName, taskToMove, newColumn } = action.payload;
      const currentProject = state.currentProject;
      state.projects[currentProject].columns = state.projects[currentProject].columns.map(el => {
        if (el.columnName === columnName) {
          el.tasks = el.tasks.filter(task => task.taskName !== taskToMove);
        }
        if (el.columnName === newColumn) {
          el.tasks.push({taskName: taskToMove, taskComments: []});
        }
        return el;
      })
    }
  },
});

// need to do:  moveTask

// Action creators are generated for each case reducer function
export const { setState, createTask, createColumn, createProject, updateTask, deleteProject, deleteColumn, deleteTask } =
  userSlice.actions;

export default userSlice.reducer;
