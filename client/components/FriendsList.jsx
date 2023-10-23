import React from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';
import {useSelector} from 'react-redux/es/hooks/useSelector.js';
import AcceptedFriend from './AcceptedFriend.jsx';
import PendingReceived from './PendingReceived.jsx';
import PendingSent from './PendingSent.jsx';
import { useGetAllFriendsQuery} from '../utils/userApi.js';

/*
  W.I.P.
  This component is meant to render a list of friends.
  And allows the user to add friends through a input field.
*/

const FriendsList = ({ setIsOpen, title, saveFunc, setterFunction }) => {
  const userId = useSelector((state) => state.user.userId);
  const { data: allFriends, refetch } = useGetAllFriendsQuery();

  return (
    <div id="modal" className="textModalVisible">
      <form className="textModalInner">
        <div className="textModalHeader">
          <p>{title}</p>
          <button
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            className="closeModalButton"
            type="button"
          >
            x
          </button>
        </div>
        <TextInput setterFunction={setterFunction} placeholder="Friends" />
        <Button saveFunc={saveFunc} text="Save" setIsOpen={setIsOpen} type='button' />
        <div className="projectsList">
          {allFriends ? <ol>
            {allFriends.map((friend) => {
              
              if (friend.status === 'accepted') { 
                return <AcceptedFriend key={friend.id} refetch={refetch} {...friend} />
              }

              if (friend.status === 'pending' && friend.senderId === userId) {
                return <PendingSent key={friend.id} refetch={refetch} {...friend} />
              }

              if (friend.status === 'pending' && friend.receiverId === userId) {
                return <PendingReceived key={friend.id} refetch={refetch} {...friend} />
              }

            })}
          </ol> : null}
        </div>
      </form>
    </div>
  );
}
export default FriendsList;