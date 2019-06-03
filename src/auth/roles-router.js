'use strict';

const express = require('express');
const rolesRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');
const Role = require('./roles-model.js');


rolesRouter.get('/create-roles', (request, response, next) => {
  const user = new Role({role: 'user', capabilities: ['read']});
  const editor = new Role({role: 'editor', capabilities: ['read', 'create', 'update']});
  const admin = new Role({role: 'admin', capabilities: ['read', 'create', 'update', 'delete']});
  const superuser = new Role({role: 'superuser', capabilities: ['read', 'create', 'update', 'delete', 'superuser']});

  Promise.all([
    user.save().catch(next),
    editor.save().catch(next),
    admin.save().catch(next),
    superuser.save().catch(next),
  ])
    .then( results => {
      response.status(200).send('Creating Roles: user, editor, admin, and superuser');
    })
    .catch(next);
});

rolesRouter.get('/delete-roles', (request, response, next) => {
  Role.deleteMany({capabilities: 'read'}, function (err) {}).then( result => {
    response.send(result);
  });
});

module.exports = rolesRouter;