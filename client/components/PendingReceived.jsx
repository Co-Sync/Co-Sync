import React from 'react';
import { useAcceptFriendRequestMutation, useRemoveFriendMutation } from '../utils/userApi.js';

/**
 * This component renders the pending friend requests that the user has received.
 * It differs from the Pending sent component in that it has both an accept and reject button.
 */

const PendingReceived = ({ refetch, senderId, receiverId, senderUsername }) => {
  // ! Refactor this component to use the username instead of the id
  // receiverId is the current user's id
  // senderId is the id of the user who sent the friend request
  
  
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const handleAcceptance = async () => {
    try {
      console.log('handleAcceptance')
      // replace senderId with senderUsername
      const res = await acceptFriendRequest({ receiverId, senderId }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const handleRejection = async () => {
    try {
      console.log('handleRejection');
      // replace senderId with senderUsername
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