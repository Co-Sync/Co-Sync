import React, { useEffect } from 'react';
import TableDisplay from './TableDisplay.jsx';
import NavBar from './NavBar.jsx';
import '../css/Home.scss';
import '../css/Modal.scss'
import { useDispatch } from 'react-redux';
import { setState } from '../slices/userSlice.js';
import { useGetProjectQuery } from '../utils/userApi.js';


const Home = () => {
  // a way to use query of getting user -- maybe considering useEffect for less re-rendering ? 
  const { data, isError, isLoading, isSuccess, error } = useGetProjectQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      const userData = data;
      const projects = {}
      for (const project of userData) {
        projects[project.projectName] = project;
      }
      const transformedData = {
        projects,
        currentProject: '',
      };
      dispatch(setState(transformedData));
    }
  }, [dispatch, isSuccess, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='homeMain'>
      <NavBar />
      <TableDisplay />
    </div>
  );
}

export default Home;
