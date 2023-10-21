const FriendRequest = require('../models/FriendRequestModel');
const User = require('../models/userModel');

const FriendRequestController = {
  controllerName : 'FriendRequestController',

  // req.body: { username }   // username of user request receiver
  // req.cookies: {ssid} // Mongo_id of user request sender
  // take make a FriendRequest document need: 
  // 1. senderId
  // 2. receiverId
  // 2a. find receiverId by username
  sendFriendRequest: async (req, res, next) => {
    try {
      console.log('sendFriendRequest')
      // destruct the request object, get the senderId from the cookie and the receiverUsername from the body
      const { cookies: { ssid: senderId }, body: { friend: receiverUsername } } = req;
      if (!senderId || !receiverUsername) {
        throw {
          status: 400, 
          message: { err: 'Missing required fields' }
        }
      } 

      const {_id: receiverId} = await User.findOne({username: receiverUsername}).lean(); 
      if ( !receiverId ) {
        throw {
          status: 404,
          message: { err: 'User not found' }
        }; 
      }
      if ( receiverId === senderId ) {
        throw {
          status: 400,
          message: { err: 'Cannot send friend request to yourself' }
        }
      }

      await FriendRequest.create({ senderId: senderId, receiverId: receiverId, receiverUsername: receiverUsername });
      return next();

    } catch (error) {
      if (error.code === 11000) {
        error.status = 400;
        error.message = { err: 'Friend request already sent' }
      }
      return next({
        log: 'FriendRequestController.sendFriendRequest' + JSON.stringify(error), 
        status: error.status || 500, 
        message: error.message || { err: 'Unknown error' }
      })
    }

  },

  acceptFriendRequest: async (req, res, next) => { 
    try {
      console.log('acceptFriendRequest');
      // destruct the request object, get the senderId from the cookie and the receiverId from the params
      const { cookies: { ssid: senderId }, params: { id: receiverId } } = req;
      // find the friend request document with the senderId and receiverId
      const friendRequest = await FriendRequest.findOne({senderId: senderId, receiverId: receiverId })
      // if the friend request document does not exist, throw an error
      if (!friendRequest) {
        throw {
          status: 404,
          message: { err: 'Friend request not found' }
        }
      }
      // if the friend request document does exist, update the status to 'accepted'
      friendRequest.status = 'accepted';
      // save the friend request document
      await friendRequest.save();
      // call next
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
      // destruct the request object, get the senderId from the cookie and the receiverId from the params
      const { cookies: { ssid: senderId }, params: { id: receiverId } } = req;
      // find the friend request document with the senderId and receiverId
      // ! remove variable assignment after testing
      const rejectedFriendRequest = await FriendRequest.findOneAndDelete({ senderId: senderId, receiverId: receiverId }); 
      // ! remove console.log after testing
      console.log(rejectedFriendRequest);
      // if the friend request document does not exist, throw an error
      next();

    } catch (error) {
      return next({
        log: 'FriendRequestController.rejectFriendRequest',
        status: 500,
        message: { err: 'Unknown error' }
      })
    }
  },

  // ! consider combining with the getAccepted friends to return all friends in the pending and accepted status
  getPendingFriends: async (req, res, next) => {
    try {
      console.log('getPendingFriends');
      // get the senderId from the cookie
      const { ssid: userId } = req.cookies;
      console.log('userId: ', userId)
      // find all friend requests where the receiverId is the senderId and the status is 'pending'
      // ! get request where the user is the sender and the receivver, are currently only getting requests where user is the receiver
      const pendingFriendRequests = await FriendRequest.find({ senderId: userId, status: 'pending' }).lean();
      console.log('pendingFriendRequests: ', pendingFriendRequests)
      if (!pendingFriendRequests) {
        throw {
          status: 404,
          message: { err: 'No pending friend requests' }
        }
      }
      res.locals.pendingFriendRequests = pendingFriendRequests;
      return next();

    } catch (error) {
      console.log('TemporaryLog: ', error)
      return next({
        log: 'FriendRequestController.sendFriendRequest' + JSON.stringify(error), 
        status: error.status || 500, 
        message: error.message || { err: 'Unknown error' }
      })
    }
  },

  getAcceptedFriends: async (req, res, next) => { 
    try {
      console.log('getAcceptedFriends')
      const { ssid: userId } = req.cookies;
      const acceptedFriendRequests = await FriendRequest.find({ senderId: userId, status: 'accepted' })
      if (!acceptedFriendRequests) {
        throw {
          status: 404,
          message: { err: 'No accepted friend requests' }
        }
      }
      console.log('acceptedFriendRequests', acceptedFriendRequests)
      res.locals.acceptedFriendRequests = acceptedFriendRequests;
      return next();
    } catch (error) {
      console.log('TemporaryLog: ', error)
      return next({
        log: 'FriendRequestController.getAcceptedFriends' + JSON.stringify(error), 
        status: error.status || 500, 
        message: error.message || { err: 'Unknown error' }
      })

    }
  },

  getAllFriends: async (req, res, next) => {
    try {
      console.log('getAllFriends');
      const { ssid: userId } = req.cookies;
      // searches for all friend requests where the senderId or receiverId is the userId
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

  // to remove friend need the id of friend being removed and id of user removing friend
  // friend being removed is the receiverId
  // frined removing is the senderId
  // we have the senderId from the cookie
  // we have the receiverId from the params
  removeFriend: async (req, res, next) => {
    try {
      console.log('removeFriend')
      const { cookies: { ssid: senderId }, params: { id: receiverId } } = req;
      console.log('senderId', senderId, 'receiverId', receiverId); 

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