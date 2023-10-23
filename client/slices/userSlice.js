import { createSlice, current } from '@reduxjs/toolkit';
// see more at https://redux-toolkit.js.org/tutorials/quick-start
// using rtk with createSlice instead of original redux 
// in majority of the actions, we find the column/project/task by their matching ID or name to then perform a specific action on that column/task/project

const initialState = {
  username: '',
  // temp solution: save the userId to global state
  userId: '',
  projects: {},
  numOfProjects: 0,
  currentProject: '',
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.projects = action.payload.projects;
      state.numOfProjects = action.payload.numOfProjects;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.loggedIn = true;
    },
    resetState: (state) => {
      state.projects = {};
      state.numOfProjects = 0;
      state.username = '';
      state.userId = '';
      state.currentProject = '';
      state.loggedIn =false; 
    },
    setUserName: (state, action) => {
      try {
        const username = action.payload;
        state.username = username
      } catch (error) {
        console.error('Error in setUserName reducer: ', error);
      }
    },
    setUser: (state, { payload }) => {
      try {
        console.log('setUser reducer triggered');
        state.userId = payload._id;
        state.username = payload.username;
        console.log('state after setUser: ', state.userId);
        
      } catch (error) {
        console.error('Error in setUserName reducer: ', error);
      }

    },
    createTask: (state, action) => {
      try {
        console.log('createTask reducer triggered');
        const { columnId, task } = action.payload;
        const currentProject = state.currentProject;
        state.projects[currentProject].columns = state.projects[currentProject].columns.map((el) => {
          if (el._id === columnId) {
            el.tasks.push({ taskName: task, taskComments: '' });
          }
          return el;
        });
      } catch (error) {
        console.error('Error in createTask reducer: ', error);
      }
    },
    createColumn: (state, action) => {
      try {
        const { columnName, _id } = action.payload;
        console.log(columnName)
        console.log('current project is:', current(state.currentProject));
        const currentProject = state.currentProject;
        if (!state.projects[currentProject].columns.find((col) => col.columnName === columnName)) {
          state.projects[currentProject].columns.push({
            columnName,
            tasks: [],
            _id: _id
          });
        }
      } catch (error) {
        console.error('Error in createColumn reducer: ', error);
      }
    },
    createProject: (state, action) => {
      try {
        const { projectName } = action.payload;
        if (!state.projects[projectName]) {
          state.projects[projectName] = {
            columns: [],
          };
          state.currentProject = projectName;
          state.currentProject = projectName;
          state.numOfProjects++;
        }
      } catch (error) {
        console.error('Error in createProject reducer: ', error);
      }
    },
    updateTask: (state, action) => {
      try {
        console.log('current project is in updateTask: ', state.currentProject);
        const { updatedTask, columnId } = action.payload;
        const currentProject = state.currentProject;
        // Find the column whose _id is columnId.
        const column = state.projects[currentProject].columns.find(
          (col) => (col._id === columnId)
        );

        if (column) {
          // Find the task whose _id is updatedTask._id (_id is not changed).
          const taskIndex = column.tasks.findIndex(
            (task) => task._id === updatedTask._id
          );
          if (taskIndex !== -1) {
            column[taskIndex] = updatedTask;
          }
        }
      } catch (error) {
        console.error('Error in updateTask reducer: ', error);
      }
    },
    deleteProject: (state, action) => {
      try {
        const { projectName } = action.payload;
        for (const proj in state.projects) {
          if (proj === state.projects[projectName]) {
            delete state.projects[projectName];
          }
        }
        state.numOfProjects--;
      } catch (error) {
        console.error('Error in deleteProject reducer: ', error);
      }
    },
    deleteColumn: (state, action) => {
      try {
        console.log('deleteColumn reducer triggered');
        const { columnId } = action.payload;
        const currentProject = state.currentProject;

        const column = state.projects[currentProject].columns.find(
          (col) => {
            col._id === columnId;
          }
        );
        console.log('col', column);

        if (column) {
          delete state.projects[currentProject].columns[column];
        }
      } catch (error) {
        console.error('Error in deleteColumn reducer: ', error);
      }
    },
    deleteTask: (state, action) => {
      try {
        console.log('deleteTask reducer triggered');
        const { taskId, columnId } = action.payload;
        const currentProject = state.currentProject;

        const column = state.projects[currentProject].columns.find(
          (col) => (col._id === columnId)
        );

        console.log('Found column:', column);

        if (column) {
          const taskIndex = column.tasks.findIndex(
            (task) => task._id === taskId
          );
          console.log('Task index:', taskIndex);

          if (taskIndex !== -1) {
            const spliced = column.tasks.slice();
            spliced.splice(taskIndex, 1);

            console.log('Tasks after splice:', spliced);

            const newColumn = { ...column, tasks: spliced };
            state.projects[currentProject].columns[taskIndex] = newColumn;
          }
        }
        console.log('Task not found');
        return state;
      } catch (error) {
        console.error('Error in deleteTask reducer: ', error);
      }
    },
    moveTask: (state, action) => {
      try {
        const { oldColumnId, newColumnId, taskId } = action.payload;
        const currentProject = state.currentProject;
        const project = state.projects[currentProject];
        let oldColumn = project.columns.find(column => column._id === oldColumnId);
        let newColumn = project.columns.find(column => column._id === newColumnId);
        if (oldColumn && newColumn) {
          let taskIndex = oldColumn.tasks.findIndex(task => task._id === taskId);
          if (taskIndex >= 0) {
            let task = oldColumn.tasks[taskIndex];
            oldColumn.tasks.splice(taskIndex, 1);
            newColumn.tasks.push(task);
          }
        }
      } catch (error) {
        console.error('Error in moveTask reducer: ', error);
      }
    },
    setCurrentProjectName: (state, action) => {
      try {
        const projectName = action.payload;
        state.currentProject = projectName;
      } catch (error) {
        console.error('Error in setCurrentProjectName reducer: ', error);
      }
    },
  }
});

// Action creators are generated for each case reducer function
export const { setUserState, createTask, createColumn, createProject, updateTask, deleteProject, deleteColumn, deleteTask, moveTask,
  setCurrentProjectName, setUserName, setUser, resetState } =
  userSlice.actions;
export default userSlice.reducer;
