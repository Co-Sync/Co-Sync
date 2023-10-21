const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

// create friendRequest document schema 
const friendRequestSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverUsername: { type: String, required: true },
  senderUsername: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'] }
}, { timestamps: true });

friendRequestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true })

const friendRequest = mongoose.model('friendRequest', friendRequestSchema);

module.exports = friendRequest;