![CF](http://i.imgur.com/7v5ASc8.png) LAB   
=================================================   
  
## API Server   
  
### Author: Morgana Spake  
  
### Links and Resources  
* [submission PR](https://github.com/401-advanced-javascript-mspake/api-server/pull/1)  
  
### Modules  
#### `app.js, v1.js, 404.js, 500.js, model-finder.js, mongo-model,js, players-model.js, players-schema.js, teams-model.js, teams-schema.js, users-model.js, router.js, roles-router.js, roles-model.js, middleware.js, google.js`  
  
##### Exported Values and Methods  
  
###### `app -> express server`  
###### `router -> express Router instance`   
###### `404 -> middelware`  
###### `500 -> middelware error handler`  
###### `model-finder -> middelware`  
###### `mongo-model -> Model class constructor`  
###### `players-model -> new instance of the Players class`  
###### `teams-model -> new instance of the Teams class`  
###### `teams-schema -> mongoose schema`  
###### `players-schema -> mongoose schema`  
###### `users-model -> new instance of the Users class`  
###### `roles-router -> express Router instance`  
###### `roles-model -> new instance of the Role class`  
###### `middleware -> authorization middlware`  
###### `google.js -> google oauth function`
  
### Setup   
#### `.env` requirements  
* `PORT` - Port Number (ie: 3000)  
* `MONGODB_URI` - URL to the running mongo instance/db (ie: mongodb://localhost:27017/databaseName)
* `SECRET` - Secret used for encoding tokens  
* `GOOGLE_CLIENT_ID`  
* `GOOGLE_CLIENT_SECRET`  
* `TOKEN_EXPIRE`  
* `SINGLE_USE_TOKENS`  
  
#### Running the app  
* `npm start`  
  
Endpoints:  
* `/api/v1/:model`  
* `/api/v1/:model`  
* `/api/v1/:model/:id`  
* `/api/v1/:model/:id`  
* `/api/v1/:model/:id`  
* `/signup`  
* `/signin`  
* `/oauth`  
* `/key`  
* `/create-roles`  