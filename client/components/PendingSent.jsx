import React from 'react';
import {useRemoveFriendMutation} from '../utils/userApi.js';

const PendingSent = ({ refetch, senderId, receiverId, receiverUsername }) => {
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