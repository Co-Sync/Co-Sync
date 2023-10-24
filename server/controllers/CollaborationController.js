const Collaboration = require('../models/collaborationModel');
const User = require('../models/userModel');
const Project = require('../models/projectModel');

const collaborationController = {
  /**
   * takes the projectId the username of would be collaborator
   */

  addCollaborator: async (req, res, next) => { 
    try {
      console.log('addCollaborator'); 
      console.log(req.body, req.cookies);

      const { cookies: { ssid: creator }, body: { projectId, username } } = req;
      if (!projectId || !username || !creator) { 
        throw {
          status: 400,
          message: { err: 'Missing projectId or username' }
        }
      }
      const {_id: collaboratorId} = await User.findOne({ username });
      if (!collaboratorId) { 
        throw {
          status: 400,
          message: { err: 'User not found' }
        }
      }

      const collaboration = await Collaboration.findOne({ projectId }) 

      if (!collaboration) {

        const collaboration = await Collaboration.create({ projectId, creator })
        
        collaboration.collaborators.push({ userId: collaboratorId });

        await collaboration.save();

        res.locals.collaboration = collaboration;

        return next();

      } else {

        console.log('inside else condition')

        const { collaborators } = collaboration;
          
        if (collaborators.find(({ userId }) => userId.equals(collaboratorId))) { 
          throw {
            status: 400,
            message: { err: 'Collaborator already exists' }
          }
        }

        collaborators.push({ userId: collaboratorId });

        await collaboration.save();
  
        res.locals.collaboration = collaboration;
  
        return next();
        
      }
  
    } catch (error) {
      return next({
        log: 'Error in collaborationController.addCollaborator',
        status: error.status || 500,
        message: error.message || { err: 'Unknown error' }
      })
    }
  },

  getCollaborators: async (req, res, next) => { 
    try {
      console.log('viewCollaboraors'); 
      const { params: { id: projectId }, cookies: { ssid: creator } } = req; 

      const collaboration = await Collaboration.findOne({ projectId }).populate({
        path: 'collaborators.userId',
        select: 'username'
      }); 
 
      if (!collaboration) {
        throw {
          status: 400,
          message: { err: 'Collaboration not found' }
        }
      }

      const collaborators = collaboration.collaborators; 
      console.log('Collaborators', collaborators); 
      res.locals.collaborators = collaborators;
      next();
      
    } catch (error) {
      return next({
        log: 'Error in collaborationController.getCollaborators',
        status: error.status || 500,
        message: error.message || { err: 'Unknown error' }
      })
    }
  }
};

module.exports = collaborationController;