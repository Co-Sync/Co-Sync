import React, { useState } from 'react';
import ScrollBarItem from './ScrollBarItem.jsx';
import { useDispatch } from 'react-redux';

const ScrollBar = () => {
  const [column, setColumn] = useState('');
  const dispatch = useDispatch();
  const dispatchColumn = (e) => {
    e.preventDefault();
    dispatch();
  }
  return (
    <div className='scrollBarOuter'>
      <ul className='scrollBarInner'>
        <ScrollBarItem setterFunction={setColumn} onClick={dispatchColumn} placeholder='Add Column' type='text' title='Column Name'/>
        <ScrollBarItem placeholder='My Projects' type='view' title='Projects'/>
      </ul>
    </div>
  )
}

export default ScrollBar;