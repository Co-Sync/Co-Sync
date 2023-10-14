import React from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';
const FriendsList = ({ setIsOpen, title, saveFunc, setterFunction }) => {
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
          <p>Friends go here</p>
        </div>
      </form>
    </div>
  );
}
export default FriendsList;