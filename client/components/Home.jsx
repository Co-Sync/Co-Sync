import React from 'react';
import TableDisplay from './TableDisplay.jsx';
import NavBar from './NavBar.jsx';
import '../css/Home.scss';
import { useDispatch } from 'react-redux';
import { setState } from '../slices/userSlice.js';

const Home = () => {
  // const { data, isError, isLoading } = useGetUserQuery();
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