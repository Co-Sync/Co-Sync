import React, { useState } from 'react';
import Button from './Button.jsx';
import TextModal from './TextModal.jsx';
import ProjectsViewModal from './ProjectsViewModal.jsx';
import FriendsList from './FriendsList.jsx';

/*
  This component renders the individual buttons in the scroll bar, the type can be,
  text, view, or friends.
  The text type renders a text input field.
  The view type renders a list of projects, although it can be adapted to display anything.
  The friends type renders a list of friends.
*/

const ScrollBarItem = ({ setterFunction, saveFunc, placeholder, type, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className='scrollBarListItem'>
      <Button saveFunc={() => setIsOpen(!isOpen)} text={placeholder} type='button'/>
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