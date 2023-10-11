import React, { useState } from 'react';
import ScrollBarItem from './ScrollBarItem.jsx';
import { useDispatch } from 'react-redux';
import { useAddColumnMutation } from '../utils/userApi.js';
import { createColumn } from '../slices/userSlice.js';

const ScrollBar = () => {
  const [column, setColumn] = useState('');
  const [currentProjectName, setCurrentProjectName] = useState('');
  // let projectId = currentProject._id;

  const dispatch = useDispatch();
  // const dispatchColumn = (e) => {
  //   e.preventDefault();
  //   dispatch(createColumn(column))
  // }

  //tested this - 404 err: 'project does not exist' => projectcontroler.js - createcolumn, NEEDS PROJECT ID IN REQ BODY
  const [addColumnMutation] = useAddColumnMutation();

  const handleAddColumnClick = async (e) => {
    e.preventDefault();
    const body = {
      // projectId,
      columnName: column,
      tasks: [],
    }
    try {
      const res = await addColumnMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(createColumn(res));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetProjectName = (e) => {
    e.preventDefault();
    dispatch(setCurrentProjectName(currentProjectName));
  }

  return (
    <div className='scrollBarOuter'>
      <ul className='scrollBarInner'>
        <ScrollBarItem setterFunction={setColumn} onClick={handleAddColumnClick} placeholder='Add Column' type='text' title='Column Name' />
        <ScrollBarItem setterFunction={setCurrentProjectName} onClick={handleSetProjectName} placeholder='Create Project' type='text' title='Project Name' />
        <ScrollBarItem placeholder='My Projects' type='view' title='Projects' />
      </ul>
    </div>
  )
}

export default ScrollBar;