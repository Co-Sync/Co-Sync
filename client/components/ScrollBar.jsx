import React from 'react';
import Button from './Button.jsx';

const ScrollBar = () => {
  return (
    <div className='scrollBarOuter'>
      <ul className='scrollBarInner'>
        <li className='scrollBarListItem'>
          <Button text='Add Column' />
        </li>
        <li className='scrollBarListItem'>
          <Button text='Add Row' />
        </li>
        <li className='scrollBarListItem'>
          <Button text='Add Cell' />
        </li>
      </ul>
    </div>
  )
}

export default ScrollBar;