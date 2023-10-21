import React from 'react';
import {useSelector} from 'react-redux/es/hooks/useSelector.js';
import {useAcceptFriendRequestMutation, useRejectFriendRequestMutation} from '../utils/userApi.js';

const PendingFriendRequest = ({ receiverUsername, receiverId, senderId }) => {
  const userId = useSelector((state) => state.user.userId); 
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();

  const userIsSender = userId === senderId
  console.log('userIsSender', userIsSender)
  console.log('userId', userId)
  console.log('senderId', senderId)

  const handleAcceptance = async () => {
    console.log('handleAcceptance')
    const res = await acceptFriendRequest({receiverId}).unwrap();
  }
  
  const handleRejection = async () => {
    try {
      console.log('handleRejection')
      const res = await rejectFriendRequest({receiverId}).unwrap();
      console.log(res);
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {userIsSender ? (
        <p>Yes</p>
      ) :
        (<p>No</p>)
      }
    </>
  )
}

export default PendingFriendRequest; 