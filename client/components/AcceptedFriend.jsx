import React from 'react';
import { useRemoveFriendMutation } from '../utils/userApi.js'

const AcceptedFriend = ({ receiverId, receiverUsername}) => {
  const [removeFriend] = useRemoveFriendMutation();

  const handleRemoval = async () => { 
    try {
      console.log('handleRemoval')
      const res = await removeFriend({receiverId}).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <li>
      <p>{receiverUsername}</p>
      <p>{receiverId}</p>
      <button onClick={handleRemoval} type='button'>Unfriend</button>
    </li>
  );
}

export default AcceptedFriend;