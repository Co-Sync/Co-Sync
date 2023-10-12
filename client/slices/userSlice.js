import { createSlice, current } from '@reduxjs/toolkit';
// see more at https://redux-toolkit.js.org/tutorials/quick-start

const initialState = {
  username: '',
  projects: {},
  numOfProjects: 0,
  currentProject: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      return action.payload;
    },
    setUserName: (state, action) => {
      try {
        const username = action.payload;
        state.username = username;
      } catch (error) {
        console.error('Error in setUserName reducer: ', error);
      }
    },
    createTask: (state, action) => {
      try {
        const { findColumnName, task } = action.payload;
        const currentProject = state.currentProject;
        console.log(task);
        state.projects[currentProject].columns = state.projects[currentProject].columns.map((el) => {
          if (el.columnName === findColumnName) {
            el.tasks.push({ taskName: task, taskComments: [] });
          }
          return el;
        });
      } catch (error) {
        console.error('Error in createTask reducer: ', error);
      }
    },
    createColumn: (state, action) => {
      try {
        const addColumnName = action.payload;
        console.log(addColumnName)
        const currentProject = state.currentProject;
        if (!state.projects[currentProject].columns.find((col) => col.columnName === addColumnName)) {
          state.projects[currentProject].columns.push({
            addColumnName,
            tasks: [],
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
            // Update state.
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
        let outerIndx = 0;
        const { findColumnName } = action.payload;
        const currentProject = state.currentProject;
        const column = state.projects[currentProject].columns.find(
          (col, indx) => {
            col.columnName === findColumnName;
            outerIndx = indx;
          }
        );

        if (column) {
          delete state.projects[currentProject].columns[outerIndx];
        }
      } catch (error) {
        console.error('Error in deleteColumn reducer: ', error);
      }
    },
    deleteTask: (state, action) => {
      try {
        console.log('deleteTask reducer triggered');
        // let outerIndx = 0;
        const { taskId, columnId } = action.payload;
        const currentProject = state.currentProject;

        console.log('state', current(state.projects[currentProject].columns));
        const column = state.projects[currentProject].columns.find(
          (col) => (col._id === columnId)
        );

        //returning undefined but is selected in the DELETE method, why? 
        console.log('Found column:', column);

        if (column) {
          //find index of the task to delete
          const taskIndex = column.tasks.findIndex(
            (task) => task._id === taskId
          );
          console.log('Task index:', taskIndex);

          if (taskIndex !== -1) {
            const spliced = column.tasks.slice();
            spliced.splice(taskIndex, 1);

            console.log('Tasks after splice:', spliced);

            const newColumn = { ...column, tasks: spliced };
            // const newProjects = [...state.projects];
            state.projects[currentProject].columns[taskIndex] = newColumn;

            // console.log('New projects:', newProjects);

            // return { ...state, projects: newProjects };
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
        const { findColumnName, taskToMove, newColumn } = action.payload;
        const currentProject = state.currentProject;
        state.projects[currentProject].columns = state.projects[currentProject].columns.map(el => {
          if (el.columnName === findColumnName) {
            el.tasks = el.tasks.filter(task => task.taskName !== taskToMove);
          }
          if (el.columnName === newColumn) {
            el.tasks.push({ taskName: taskToMove, taskComments: [] });
          }
          return el;
        })
      } catch (error) {
        console.error('Error in moveTask reducer: ', error);
      }
    },
    setCurrentProjectName: (state, action) => {
      try {
        const projectName = action.payload;
        console.log(projectName)
        state.currentProject = projectName;
      } catch (error) {
        console.error('Error in setCurrentProjectName reducer: ', error);
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUserState, createTask, createColumn, createProject, updateTask, deleteProject, deleteColumn, deleteTask, moveTask, 
  setCurrentProjectName, setUserName } =
  userSlice.actions;
export default userSlice.reducer;
