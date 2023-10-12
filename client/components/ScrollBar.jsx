import React, { useState } from 'react';
import ScrollBarItem from './ScrollBarItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useAddColumnMutation, useAddProjectMutation } from '../utils/userApi.js';
import { createColumn, createProject, setCurrentProjectName } from '../slices/userSlice.js';

const ScrollBar = ({currentProject}) => {
  const [project, setProject] = useState('');
  const [column, setColumn] = useState('');
  const [addColumnMutation] = useAddColumnMutation();
  const [addProjectMutation] = useAddProjectMutation();
  const dispatch = useDispatch();

  console.log(`Current project is: ${currentProject}`);

  const handleAddColumnClick = async (e) => {
    e.preventDefault();
    const body = {
      // projectId,
      columnName: column,
      // tasks: [],
      projectId: currentProject._id
    }
    try {
      const res = await addColumnMutation(body);
      if (res.error) throw new Error(res.error.message);
      console.log(`res is ${res}`);
      dispatch(createColumn(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetProjectName = (e) => {
    console.log(e);
    e.preventDefault();
    dispatch(setCurrentProjectName(e.target.value));
  }

  const handleSetProject = async (e) => {
    e.preventDefault();
    const body = {
      projectName: project, // Corrected the property name to projectName
    };
    console.log(body)
    try {
      const res = await addProjectMutation(body);
      console.log(res)
      if (res.error) throw new Error(res.error.message);

      dispatch(createProject(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='scrollBarOuter'>
      <ul className='scrollBarInner'>
        <ScrollBarItem 
          setterFunction={setColumn} 
          onClick={handleAddColumnClick} 
          placeholder='Add Column' 
          type='text' 
          title='Column Name' 
        />
        <ScrollBarItem 
          placeholder='Create Project' 
          type='text' 
          title='Project Name'
          setterFunction={setProject}
          onClick={handleSetProject}
        />
        <ScrollBarItem 
          placeholder='My Projects' 
          type='view'
          title='Projects' 
          onClick={handleSetProjectName}
        />
      </ul>
    </div>
  )
}

export default ScrollBar;