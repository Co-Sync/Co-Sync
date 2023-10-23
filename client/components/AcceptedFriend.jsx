import React from 'react';
import {useSelector} from 'react-redux/es/hooks/useSelector.js';
import { useRemoveFriendMutation } from '../utils/userApi.js'

const AcceptedFriend = ({ refetch, senderId, receiverId, senderUsername, receiverUsername }) => {
  const userId = useSelector((state) => state.user.userId);
  const [removeFriend] = useRemoveFriendMutation();

  const isUserSender = userId === senderId;

  const handleRemoval = async () => {
    try {
      console.log('handleRemoval')
      const res = await removeFriend({ receiverId, senderId }).unwrap();
      refetch(); 
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <li>
      {
        isUserSender ? (
          <p>{receiverUsername}</p>
        ) : (
          <p>{senderUsername}</p>
        )
      } 
      <button onClick={handleRemoval} type='button'>Unfriend</button>
    </li>

  )
}

export default AcceptedFriend;