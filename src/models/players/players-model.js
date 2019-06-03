'use strict';

/**
 * Players Class module.
 * Exports a new instance of the Player class using the required in schema.
 * @module src/api/models/players/players-model
 */


const Model = require('../mongo-model.js');
const schema = require('./players-schema.js');

/**
 * Players Class, extend the Model class
 * @constructor Players
 */
class Players extends Model {}

module.exports = new Players(schema);

