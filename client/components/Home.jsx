import React from 'react';
import TableDisplay from './TableDisplay.jsx';
import NavBar from './NavBar.jsx';
import '../css/Home.scss';
import { useDispatch } from 'react-redux';
import { setState } from '../slices/userSlice.js';
import { useGetUserQuery } from '../utils/userApi.js';

const Home = () => {
  /*
  a way to use query of getting user -- maybe considering useEffect for less re-rendering ? 
  
  const { data: userData, isError, isLoading, isSuccess, error } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error}</div>;
  }

  if (isSuccess) {
    const {username, projects, numOfProjects, currentProject} = userData;
  
    const transformedData = {
      username,
      projects: {
        [currentProject]: {
          columns:
            projects[currentProject].columns,
        },
      },
      numOfProjects,
      currentProject,
    };

    dispatch(setState(transformedData));
  } */

  const data = {
    username: 'testUser',
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
    currentProject: 'project1',
  }
  const dispatch = useDispatch();
  if (data) {
    dispatch(setState(data));
  }
  return (
    <div className='homeMain'>
      <NavBar />
      <TableDisplay />
    </div>
  );
}

export default Home;