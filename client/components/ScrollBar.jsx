import React, { useState } from 'react';
import ScrollBarItem from './ScrollBarItem.jsx';
import { useDispatch } from 'react-redux';
import { useAddColumnMutation } from '../utils/userApi.js';
import { createColumn } from '../slices/userSlice.js';

const ScrollBar = () => {
  const [column, setColumn] = useState('');
  // let projectId = currentProject._id;

  const dispatch = useDispatch();
  // const dispatchColumn = (e) => {
  //   e.preventDefault();
  //   dispatch(createColumn(column))
  // }

  //tested this - 404 err: 'project does not exist' => projectcontroler.js - createcolumn, NEEDS PROJECT ID IN REQ BODY
  const [addColumnMutation] = useAddColumnMutation();

  const handleAddClick = async (e) => {
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

  return (
    <div className='scrollBarOuter'>
      <ul className='scrollBarInner'>
        <ScrollBarItem setterFunction={setColumn} onClick={handleAddClick} placeholder='Add Column' type='text' title='Column Name' />
        <ScrollBarItem setterFunction={setColumn} onClick={handleAddClick} placeholder='Create Project' type='text' title='Project Name' />
        <ScrollBarItem placeholder='My Projects' type='view' title='Projects' />
      </ul>
    </div>
  )
}

export default ScrollBar;