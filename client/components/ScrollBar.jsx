import React, { useState } from 'react';
import ScrollBarItem from './ScrollBarItem.jsx';
import { useDispatch } from 'react-redux';
import { useAddColumnMutation, useAddProjectMutation } from '../utils/userApi.js';
import { createColumn, createProject } from '../slices/userSlice.js';




const ScrollBar = () => {
  const [column, setColumn] = useState('');
  const [project, setProject] = useState('');

  const dispatch = useDispatch();

  const [addColumnMutation] = useAddColumnMutation();
  const [addProjectMutation] = useAddProjectMutation();
  const handleAddColumnClick = async (e) => {
    e.preventDefault();
    const body = {
      columnName: column,
      tasks: [],
    };
    try {
      const res = await addColumnMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(createColumn(res));
    } catch (error) {
      console.log(error);
    }
  };

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
  }



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
        />
        <ScrollBarItem 
          placeholder='My Projects' 
          type='view' 
          title='Projects' 
          onClick={handleSetProject}
        />
      </ul>
    </div>
  );
};

export default ScrollBar;