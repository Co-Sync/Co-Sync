import React, { useEffect } from 'react';
import TableDisplay from './TableDisplay.jsx';
import NavBar from './NavBar.jsx';
import '../css/Home.scss';
import '../css/Modal.scss'
import { useDispatch } from 'react-redux';
import { setUserState } from '../slices/userSlice.js';
import { useGetProjectQuery, useValidateUserQuery } from '../utils/userApi.js';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const { isError: userInvalid, isLoading } = useValidateUserQuery();

  const { data, isError, isLoading: isProjectsLoading, isSuccess, error } = useGetProjectQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInvalid) {
      if (isSuccess) {
        const userData = data;
        const projects = {}
        for (const project of userData) {
          projects[project.projectName] = project;
        }
        const transformedData = {
          projects,
          numOfProjects: userData.length,
        };
        dispatch(setUserState(transformedData));
      }
    } else if (userInvalid && !isLoading) {
      navigate('/login');
    }
  });
  if (isProjectsLoading || isLoading) return (<div>Loading...</div>);
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
