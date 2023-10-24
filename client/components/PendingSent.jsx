import React from 'react';
import {useRemoveFriendMutation} from '../utils/userApi.js';

/**
 * This component renders the pending friend requests that the user has sent.
 * It differs from the Pending received component in that it only has a cancel button.
 */

const PendingSent = ({ refetch, senderId, receiverId, receiverUsername }) => {
  // ! Refactor this component to use the username instead of the id
  // receiverId is the current user's id
  // senderId is the id of the user who sent the friend request

  const [removeFriend] = useRemoveFriendMutation();

  const handleCancellation = async () => { 
    try {
      console.log('handleCancel')
      const res = await removeFriend({ senderId, receiverId }).unwrap();
      console.log(res)
      refetch();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ol>
      <li>
        <p>{receiverUsername}</p>
        <button onClick={handleCancellation} type='button'>Cancel</button>
      </li>
    </ol>
  );
}

export default PendingSent;