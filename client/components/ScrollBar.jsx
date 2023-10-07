import React from 'react';
import Button from './Button.jsx';
import TextModal from './TextModal.jsx';
import { useState } from 'react';

const ScrollBar = () => {
  const [ toggleModal, setToggleModal ] = useState(false);
  const [ eventCoords, setEventCoords ] = useState({x: 0, y: 0});
  const onClick = (e) => {
    setToggleModal(prev => !prev);
    setEventCoords({ x: e.pageX, y: e.pageY});
  }
  return (
    <div className='scrollBarOuter'>
      <ul className='scrollBarInner'>
        <li className='scrollBarListItem'>
          <Button onClick={ onClick } text='Add Column' />
        </li>
      </ul>
      <TextModal visible={ toggleModal } eventCoords={ eventCoords } />
    </div>
  )
}

export default ScrollBar;