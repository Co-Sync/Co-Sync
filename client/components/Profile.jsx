import React, { useState } from 'react';
import NavBar from './NavBar.jsx';
import '../css/Profile.scss';
import { useSelector } from 'react-redux';
import ScrollBarItem from './ScrollBarItem.jsx';
import { useSendFriendRequestMutation} from '../utils/userApi.js';
/*
  W.I.P.
  This component renders the profile page which displays the users stats and basic info.
  It also renders the NavBar component.
*/

const Profile = () => {
  const { numOfProjects, username, userId:senderId } = useSelector(state => state.user);

  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [friend, setFriend] = useState('');
  const handleFriendRequest = async () => {
    try {
      const res = await sendFriendRequest({ friend, senderId, username }).unwrap();
      console.log(res)
      setFriend('');
      
    } catch (err) {
      console.log(err.data);
    }
  }
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