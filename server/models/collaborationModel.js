/**
 * Collaboration Model 
 */

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const CollaborationSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, default: 'pending', enum: ['pending', 'active', 'declined', 'removed', 'inactive', 'suspended'] }
    }
  ],
  
}, {timestamps: true}); 

const Collaboration = mongoose.model('Collaboration', CollaborationSchema);

module.exports = Collaboration;