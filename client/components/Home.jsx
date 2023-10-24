import React, { useEffect } from 'react';
import TableDisplay from './TableDisplay.jsx';
import NavBar from './NavBar.jsx';
import '../css/Home.scss';
import '../css/Modal.scss'
import { useDispatch, } from 'react-redux';
import { setUserState } from '../slices/userSlice.js';
import { useGetUserProjectsQuery, useGetNotificationsQuery } from '../utils/userApi.js';
/*
  This is the main component for the home page. It renders the NavBar and TableDisplay components.
  It also checks for authentication and redirects to the login page if the user is not authenticated.
*/
const Home = () => {
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem('isAuth');
  const { data, isError, isLoading: isProjectsLoading, isSuccess, error } = useGetUserProjectsQuery({ skip: !isAuth });
  
  useEffect(() => {
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
    return () => {

    }
  });
  if (isProjectsLoading) return (<div>Loading...</div>);
  if (isError) return (<div>{error.message}</div>);
  return (
    <div className='homeMain'>
      {isProjectsLoading ? <div>Loading...</div> :
        isError ? <div>{error.message}</div> :
          <>
            <NavBar />
            <TableDisplay />
          </>}
    </div>
  );
}
export default Home;