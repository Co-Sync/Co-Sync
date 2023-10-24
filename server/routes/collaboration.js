const express = require('express');
const Router = express.Router();
const collaborationController = require('../controllers/CollaborationController');

/**
 * GET /collaboration/:id
 * gets all collabortions on a project
 * returns an array of collaborators
 */
Router.get('/:id', collaborationController.getCollaborators, (req, res) => { 
  res.status(200).json(res.locals.collaborators);
})

/**
 * POST /collaboration/add
 * adds a collaborator to a project
 * returns the new collaboration
 */
Router.post('/add', collaborationController.addCollaborator, (req, res) => {
  res.status(200).json(res.locals.collaboration);
}); 

module.exports = Router;