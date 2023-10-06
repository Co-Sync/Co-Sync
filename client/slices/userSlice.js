import { createSlice } from "@reduxjs/toolkit";
// see more at https://redux-toolkit.js.org/tutorials/quick-start

const initialState = {
  username: "",
  projects: {
    project1: {
      columns: [
        {
          columnName: "column1",
          tasks: [{ taskName: "task1", taskComments: "" }],
        },
      ],
    },
  },
  numOfProjects: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setState: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
