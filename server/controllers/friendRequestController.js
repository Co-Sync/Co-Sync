const FriendRequest = require('../models/FriendRequestModel');
const User = require('../models/userModel');

// ! Refactor controllers to take username instead of id, re 
const FriendRequestController = {
  controllerName: 'FriendRequestController',
  
  sendFriendRequest: async (req, res, next) => {
    try {
      console.log('sendFriendRequest');
      const { friend: receiverUsername, senderId, username: senderUsername } = req.body; 
  
      if (!senderId || !receiverUsername || !senderUsername) {
        throw {
          status: 400, 
          message: { err: 'Missing required fields' }
        }
      } 

      const { _id: receiverId } = await User.findOne({ username: receiverUsername }); 

      if ( !receiverId ) {
        throw {
          status: 404,
          message: { err: 'User not found' }
        }; 
      }

      if (receiverId.equals(senderId)) {
        console.log('Yes, ID are equal')
        throw {
          status: 400,
          message: { err: 'Cannot send friend request to yourself' }
        }
      }
      await FriendRequest.create({ senderId: senderId, senderUsername: senderUsername, receiverId: receiverId, receiverUsername: receiverUsername});
      return next();

    } catch (error) {
      if (error.code === 11000) {
        error.status = 400;
        error.message = { err: 'Friend request already sent' }
      }
      return next({
        log: 'FriendRequestController.sendFriendRequest', 
        status: error.status || 500, 
        message: error.message || { err: 'Unknown error' }
      })
    }

  },

  acceptFriendRequest: async (req, res, next) => { 
    try {
      console.log('acceptFriendRequest');
      const {senderId, receiverId} = req.body; 
      if (!receiverId || !senderId) {
        throw {
          status: 400,
          message: { err: 'Missing required fields' }
        }
      }
      const acceptedFriendRequest = await FriendRequest.findOneAndUpdate({ senderId, receiverId }, {new: true});
      console.log(acceptedFriendRequest)
      if (!acceptedFriendRequest) {
        throw {
          status: 404,
          message: { err: 'Friend request not found' }
        }
      }
      acceptedFriendRequest.status = 'accepted';
      acceptedFriendRequest.save();

      next();


    } catch (error) {
      return next({
        log: 'FriendRequestController.acceptFriendRequest',
        status: error.status || 500,
        message: error.message || { err: 'Unknown error' }
      });
    }
  },

  rejectFriendRequest: async (req, res, next) => {
    try {
      console.log('rejectFriendRequest')
      const { senderId, receiverId } = req.body; 
      const rejectedFriendRequest = await FriendRequest.findOneAndDelete({ senderId, receiverId }); 
      console.log(rejectedFriendRequest);
      if (!rejectedFriendRequest) {
        throw {
          status: 404,
          message: { err: 'Friend request not found' }
        }
      }
      next();

    } catch (error) {
      return next({
        log: 'FriendRequestController.rejectFriendRequest',
        status: error.status || 500,
        message: error.message || { err: 'Unknown error' }
      })
    }
  },

  getAllFriends: async (req, res, next) => {
    try {
      console.log('getAllFriends');
      const { ssid: userId } = req.cookies;
      const allFriendRequest = await FriendRequest.find({ $or: [{ senderId: userId }, { receiverId: userId }] })
      console.log('allFriendRequest', allFriendRequest)
      if (!allFriendRequest) {
        throw {
          status: 404,
          message: { err: 'No accepted friend requests' }
        }
      }

      res.locals.allFriends = allFriendRequest;

      next();

    } catch (error) {
      return next({
        log: 'FriendRequestController.getAllFriends' + JSON.stringify(error), 
        status: error.status || 500, 
        message: error.message || { err: 'Unknown error' }
      })

    }

  },

  removeFriend: async (req, res, next) => {
    try {
      console.log('removeFriend')
      console.log('Req.body', req.body)
      const {receiverId, senderId} = req.body; 
      const deletedFriendRequest = await FriendRequest.findOneAndDelete({ senderId, receiverId }, { new: true });
      console.log('deletedFriendRequest', deletedFriendRequest);
      next();

    } catch (error) {
      return next({
        log: 'FriendRequestController.removeFriend',
        status: 500, 
        message: {err: 'Unknown error'}
      })
    }
  }
};

module.exports = FriendRequestController;