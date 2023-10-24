const express = require('express');
const friendRequestController = require('../controllers/friendRequestController');

const friendRequestRouter = express.Router();

/**
 * get all friends
 * req.cookies: { ssid }   // ssid is the user's id
 */
friendRequestRouter.get('/all', friendRequestController.getAllFriends, (req, res) => {
  res.status(200).json(res.locals.allFriends);
});

/**
 * send user friend request
 * req.body: { username, friend, senderId } // username of user adding friend, friend is username of user to be added, senderId is id of user adding friend
 */
friendRequestRouter.post('/sendRequest', friendRequestController.sendFriendRequest, (req, res) => {
  res.status(200).json({message: 'Successfully sent friend request'});
});

/**
 * accept friend request
 * req.body: { username, friend, senderId }   // username of user adding friend, friend is username of user to be added, senderId is id of user adding friend
 */
friendRequestRouter.patch('/accept', friendRequestController.acceptFriendRequest, (req, res) => {
  res.status(200).json({message: 'Successfully accepted friend request'}); // return accepted friend requests
});

/**
 * reject friend request
 * req.body: { senderId, receiverId }   // senderId is id of user who sent friend request, receiverId is id of user who received friend request
 */
friendRequestRouter.put('/reject', friendRequestController.rejectFriendRequest, (req, res) => {
  res.status(200).json({message: 'Successfully rejected friend request'}); // return accepted friend requests
});

/**
 *  delete a friend from friend list
 *  req.body: { receiverId, senderId }   // username of user to be deleted
*/

friendRequestRouter.delete('/remove', friendRequestController.removeFriend, (req, res) => {
  res.status(200).json({message: 'Successfully removed friend'})
})

module.exports = friendRequestRouter;