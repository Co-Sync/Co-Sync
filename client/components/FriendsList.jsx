import React from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';
import {useSelector} from 'react-redux/es/hooks/useSelector.js';
import PendingFriendRequest from './PendingFriendRequest.jsx';
import AcceptedFriend from './AcceptedFriend.jsx';
import { useGetAcceptedFriendsQuery, useGetPendingFriendsQuery, useGetAllFriendsQuery} from '../utils/userApi.js';

/*
  W.I.P.
  This component is meant to render a list of friends.
  And allows the user to add friends through a input field.
*/

const FriendsList = ({ setIsOpen, title, saveFunc, setterFunction }) => {
  const userId = useSelector((state) => state.user.userId);

  // const { data: acceptedFriends, isLoading: acceptedLoading, error: acceptedError } = useGetAcceptedFriendsQuery();
  // const { data: pendingFriends, isLoading: pendingLoading, error: pendingError } = useGetPendingFriendsQuery();
  const { data: allFriends } = useGetAllFriendsQuery();

  console.log('All friends', allFriends)

  return (
    <div id="modal" className="textModalVisible">
      <form className="textModalInner">
        <div className="textModalHeader">
          <p>{title}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }}
            className="closeModalButton"
          >
            x
          </button>
        </div>
        <TextInput setterFunction={setterFunction} placeholder="Friends" />
        <Button saveFunc={saveFunc} text="Save" setIsOpen={setIsOpen} />
        <div className="projectsList">
          {/* Testing getAllFriendsQuery */}
          {allFriends ? <ol>
            {allFriends.map((friend) => {
              
              if (friend.status === 'accepted') { 
                return <AcceptedFriend key={friend.id} receiverUsername={friend.receiverUsername} {...friend} />
              }

              if (friend.status === 'pending') {
                return <PendingFriendRequest key={friend.id} receiverUsername={friend.receiverUsername} {...friend} />
              }

            })}
          </ol> : null}
          {/* // get pending friend requests */}
          {/* // check if user is pending receiver or pending sender */}
          {/* <p>Pending friends go here</p>
          {pendingLoading ? <div>Loading...</div> : null}
          {pendingFriends ? <ol>
            {pendingFriends.map((friend) => (
              <PendingFriendRequest key={friend.id} receiverUsername={friend.receiverUsername} {...friend} />
            ))}
          </ol> : <p>No Requests</p>} */}
          {/* // get accepted friend requests */}
          {/* <p>Accepted friends go here</p>
          {acceptedFriends ? <ol> 
            {acceptedFriends.map((friend) => (
              <AcceptedFriend key={friend.id} receiverUsername={friend.receiverUsername} {...friend} />
            ))}
          </ol> : <p>No Friends</p> } */}
        </div>
      </form>
    </div>
  );
}
export default FriendsList;