const express = require('express');
const friendRequestController = require('../controllers/friendRequestController');

const friendRequestRouter = express.Router();


friendRequestRouter.get('/all', friendRequestController.getAllFriends, (req, res) => {
  res.status(200).json(res.locals.allFriends);
});
/**
 * send user friend request
 * req.body: { username }   // username of user request receiver
 */
friendRequestRouter.post('/sendRequest', friendRequestController.sendFriendRequest, (req, res) => {
  res.status(200).json({message: 'Successfully sent friend request'});
});

/**
 * accept friend request
 * req.body: { username }   // username of user request sender
 */
friendRequestRouter.patch('/accept', friendRequestController.acceptFriendRequest, (req, res) => {
  res.status(200).json({message: 'Successfully accepted friend request'}); // return accepted friend requests
});

/**
 * reject friend request
 * req.body: { username }   // username of user request sender
 */
friendRequestRouter.put('/reject', friendRequestController.rejectFriendRequest, (req, res) => {
  res.status(200).json({message: 'Successfully rejected friend request'}); // return accepted friend requests
});

friendRequestRouter.delete('/remove', friendRequestController.removeFriend, (req, res) => {
  res.status(200).json({message: 'Successfully removed friend'})
})

module.exports = friendRequestRouter;