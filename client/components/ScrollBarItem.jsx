import React, { useState } from 'react';
import Button from './Button.jsx';
import TextModal from './TextModal.jsx';
import ProjectsViewModal from './ProjectsViewModal.jsx';
import FriendsList from './FriendsList.jsx';

const ScrollBarItem = ({ setterFunction, saveFunc, placeholder, type, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className='scrollBarListItem'>
      <Button saveFunc={() => setIsOpen(!isOpen)} text={placeholder} />
      {isOpen && type === 'text' ? 
        <TextModal placeholder={placeholder} setterFunction={setterFunction} saveFunc={saveFunc} setIsOpen={setIsOpen} title={title} /> : 
        isOpen && type === 'view' ? 
          <ProjectsViewModal setIsOpen={setIsOpen} title={title} saveFunc={saveFunc} /> : 
          isOpen && type === 'friends' ?
            <FriendsList setIsOpen={setIsOpen} title={title} saveFunc={saveFunc} setterFunction={setterFunction} /> :
            null}
    </li>
  )
}

export default ScrollBarItem;