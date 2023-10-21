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
friendRequestRouter.put('/:id/accept', friendRequestController.acceptFriendRequest, (req, res) => {
  res.status(200).json({message: 'Successfully accepted friend request'}); // return accepted friend requests
});

/**
 * reject friend request
 * req.body: { username }   // username of user request sender
 */
friendRequestRouter.put('/:id/reject', friendRequestController.rejectFriendRequest, (req, res) => {
  res.status(200).end()
});

/**
 * get user's pending friend requests
 * req.body: { username }   // username of user request sender
 */
friendRequestRouter.get('/pending', friendRequestController.getPendingFriends, (req, res) => {
  res.status(200).json(res.locals.pendingFriendRequests);
}); 

/**
 * view user's accepted friends
 * req.body: { username }   // username of user request sender
 */
friendRequestRouter.get('/accepted', friendRequestController.getAcceptedFriends, (req, res) => {
  res.status(200).json(res.locals.acceptedFriendRequests);
}); 

friendRequestRouter.delete('/:id/remove', friendRequestController.removeFriend, (req, res) => {
  res.status(200).json({message: 'Successfully removed friend'})
})

module.exports = friendRequestRouter;