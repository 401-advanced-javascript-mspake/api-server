'use strict';

process.env.SECRET = 'test';

const jwt = require('jsonwebtoken');

const Roles = require('../../../src/auth/roles-model.js');
const server = require('../../../src/app.js').app;
const supergoose = require('../supergoose.js');

const mockRequest = supergoose.server(server);

let users = {
  admin: {username: 'admin', password: 'password', role: 'admin'},
  editor: {username: 'editor', password: 'password', role: 'editor'},
  user: {username: 'user', password: 'password', role: 'user'},
};

beforeAll(async (done) => {
  await supergoose.startDB();
  done();
});


afterAll(supergoose.stopDB);

describe('Auth Router', () => {
  
  Object.keys(users).forEach( userType => {
    
    describe(`${userType} users`, () => {
      
      let encodedToken;
      let id;
      
      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            id = token.id;
            encodedToken = results.text;
            expect(token.id).toBeDefined();
            expect(token.capabilities).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
            expect(token.capabilities).toBeDefined();
          });
      });

      it('can signin with bearer', () => {
        return mockRequest.post('/signin')
          .set('Authorization', `Bearer ${encodedToken}`)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
            expect(token.capabilities).toBeDefined();
          });
      });

    });
    
  });
  
});

describe('Roles Router', () => {
  
  Object.keys(users).forEach( userType => {

    describe(`${userType} users`, () => {
      
      let encodedToken;
      let id;
      let teamId;

      it('roles route adds all roles to the database', () => {
        return mockRequest.get('/create-roles')
          .then(result => {
            expect(result.status).toBe(200);
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            encodedToken = results.text;
            var token = jwt.verify(results.text, process.env.SECRET);
            id = token.id;
          });
      });

      it('anyone can access a public route', () => {
        return mockRequest.get('/api/v1/teams')
          .then(result => {
            expect(result.status).toBe(200);            
          });
      });

      it('users with create capabilities can create a team', () => {
        return mockRequest.post('/api/v1/teams')
          .set('Authorization', `Bearer ${encodedToken}`)
          .send({ name: `The ${users[userType].role}s`})
          .then(result => {
            if(users[userType].role === 'user') {
              expect(result.status).toBe(500);
            } else {
              teamId = result._id;
              expect(result.status).toBe(200);            
            }
          });
      });

      // xit('users with update capabilities can update a team', () => {
      //   return mockRequest.put('`/api/v1/teams/${teamId}`')
      //     .set('Authorization', `Bearer ${encodedToken}`)
      //     .send({ name: `The ${users[userType].role} wizards`})
      //     .then(result => {
      //       if(users[userType].role === 'user') {
      //         expect(result.status).toBe(500);
      //       } else {
      //         expect(result.status).toBe(200);            
      //       }
      //     });
      // });

      // xit('users with delete capabilities can delete a team', () => {
      //   return mockRequest.delete(`/api/v1/teams/${teamId}`)
      //     .set('Authorization', `Bearer ${encodedToken}`)
      //     .then(result => {
      //       if(users[userType].role === 'admin') {
      //         expect(result.status).toBe(200);            
      //       } else {
      //         expect(result.status).toBe(500);
      //       }
      //     });
      // });
    });
  });
});