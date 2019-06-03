'use strict';

/**
 * Categories Class module.
 * Exports a new instance of the Category class using the schema.
 * @module src/api/models/categories/categories-model
 */

const Model = require('../memory-model.js');
/**
 * Defines a schema that gets passed into the instance of the Categories Class.
 * @constant schema
 */
const schema = {
  _id: {required:true},
  name: {required:true},
};
/**
 * Categories Class, extend the Model class
 * @constructor
 */
class Categories extends Model {}

module.exports = new Categories(schema);
