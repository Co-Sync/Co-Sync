import React from 'react';
import {useAcceptFriendRequestMutation, useRemoveFriendMutation} from '../utils/userApi.js';

const PendingReceived = ({ refetch, senderId, receiverId, senderUsername }) => {
  
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const handleAcceptance = async () => {
    try {
      console.log('handleAcceptance')
      const res = await acceptFriendRequest({ receiverId, senderId }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const handleRejection = async () => {
    try {
      console.log('handleRejection');
      const res = await removeFriend({ senderId, receiverId }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ol>
      <li>
        <p>{senderUsername}</p>
        <button onClick={handleAcceptance} type='button'>Accept</button>
        <button onClick={handleRejection} type='button'>Reject</button>
      </li>
    </ol>
  );
}

export default PendingReceived;