import React, { useEffect } from 'react';
import TableDisplay from './TableDisplay.jsx';
import NavBar from './NavBar.jsx';
import '../css/Home.scss';
import '../css/Modal.scss'
import { useDispatch } from 'react-redux';
import { setUserState } from '../slices/userSlice.js';
import { useGetUserProjectsQuery, useValidateUserQuery } from '../utils/userApi.js';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading: isProjectsLoading, isSuccess, error } = useGetUserProjectsQuery();
  // clear cache for this data on logout
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      fetch('/api/user/validate', {
        method: 'GET',
        credentials: 'include',
      }).then(res => {
        if (res.status === 200) {
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
        } else {
          navigate('/login');
        }
      }).catch(err => {
        console.log('Error while validating user: ', err);
      });
    })();
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
