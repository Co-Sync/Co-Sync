const express = require('express');
const Router = express.Router();
const collaborationController = require('../controllers/CollaborationController');

Router.get('/:id', collaborationController.getCollaborators, (req, res) => { 
  res.status(200).json(res.locals.collaborators);
})

Router.post('/add', collaborationController.addCollaborator, (req, res) => {
  res.status(200).json(res.locals.collaboration);
}); 

module.exports = Router;