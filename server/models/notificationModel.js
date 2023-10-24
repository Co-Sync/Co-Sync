const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  relatedType: { type: String, enum: ['Project', 'Collaboration', 'Message', 'Task', 'Comment', 'friendRequest'], required: true }, 
  relatedId: { type: Schema.Types.ObjectId, refPath: 'relatedType', required: true }, 
}, {timestamps: true});

NotificationSchema.index({ userId: 1, createdAt: -1 })

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification; 