import React, { useState } from 'react';
import NavBar from './NavBar.jsx';
import '../css/Profile.scss';
import { useSelector, useDispatch } from 'react-redux';
import ScrollBarItem from './ScrollBarItem.jsx';

/*
  W.I.P.
  This component renders the profile page which displays the users stats and basic info.
  It also renders the NavBar component.
*/

const Profile = () => {
  /**
   * TODO:
   * 1. Add friend request functionality
   * 2. Add friend list functionality
  */
  const dispatch = useDispatch();
  const [friend, setFriend] = useState('');
  const handleFriendRequest = (e) => {
    e.preventDefault();
    console.log(`friend: ${friend}`);
  }
  const { numOfProjects, username } = useSelector(state => state.user);
  return (
    <div className="homeMain container">
      <NavBar />
      <div className="profileContainer">
        <div className='profileHeader'>
          <h1>Welcome to your profile {username} </h1>
        </div>
        <div className='profileContainerInner'>
          <ul className='profileList'>
            <li className='profileListItem'>Username: <span className='profileListItemSpan'>{username}</span></li>
            <li className='profileListItem'>Total Projects: <span className='profileListItemSpan'>{numOfProjects}</span></li>
            <li className='profileListItem'>Friends: <span className='profileListItemSpan'>0</span></li>
          </ul>
          <div className='profileButtons'>
            <ScrollBarItem 
              setterFunction={setFriend} 
              saveFunc={handleFriendRequest} 
              placeholder='Friends' 
              type='friends' 
              title='Friends' 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;