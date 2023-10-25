import React, { useEffect } from 'react';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx'
import Settings from './components/Settings.jsx';
import Profile from './components/Profile.jsx';
import Protected from './components/Protected.jsx';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserState } from './slices/userSlice.js';
import { useGetUserProjectsQuery } from './utils/userApi.js';
import './css/index.css';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem('isAuth');
  const { data, isSuccess } = useGetUserProjectsQuery(undefined, { skip: !isAuth }); // skip auto fetch if not authenticated
  useEffect(() => {
    if (isAuth) {
      if (isSuccess && data) {
        const userData = data;
        const projects = {}
        for (const project of userData.projects) {
          projects[project.projectName] = project;
        }
        const transformedData = {
          projects,
          numOfProjects: userData.projects.length,
          username: userData.username,
          userId: userData.userId,
        };
        dispatch(setUserState(transformedData));
      }
    }
  });
  return (
    <div>
      <div className="App">
        <Routes>
          <Route
            exact path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }>
          </Route>
          <Route
            exact path="/settings"
            element={
              <Protected>
                <Settings />
              </Protected>
            }>
          </Route>
          <Route
            exact path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }>
          </Route>
          <Route
            exact path="/login"
            Component={Login}>
          </Route>
          <Route
            exact path="/signup"
            Component={SignUp}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;
