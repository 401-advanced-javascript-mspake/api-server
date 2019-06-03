'use strict';

/**
 * Teams Class module.
 * Exports a new instance of the Teams class using the required in schema.
 * @module src/api/models/teams/teams-model
 */


const Model = require('../mongo-model.js');
const schema = require('./teams-schema.js');
/**
 * Teams Class, extend the Model class
 * @constructor Teams
 */
class Teams extends Model {}

module.exports = new Teams(schema);

