import React, { useState } from 'react';
import Button from './Button.jsx';
import TextModal from './TextModal.jsx';
import ProjectsViewModal from './ProjectsViewModal.jsx';

const ScrollBarItem = ({ setterFunction, onClick, placeholder, type, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className='scrollBarListItem'>
      <Button onClick={() => setIsOpen(!isOpen)} text={placeholder} />
      {isOpen && type === 'text' ? 
        <TextModal placeholder={placeholder} setterFunction={setterFunction} onClick={onClick} setIsOpen={setIsOpen} title={title} /> : 
        isOpen && type === 'view' ? 
          <ProjectsViewModal setIsOpen={setIsOpen} title={title} /> :
          null}
    </li>
  )
}

export default ScrollBarItem;