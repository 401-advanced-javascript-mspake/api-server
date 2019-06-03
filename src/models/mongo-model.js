'use strict';

/**
 * Mongo Data Model module.
 * Exports the Model class.  
 * @module src/api/models/mongo-model
 */

/**
 * Creates a new Model
 * @constructor
 */
class Model {
  /**
   * Model constructor, takes in a mongoose schema
   * @param {*} schema - Mongoose Schema
   */
  constructor(schema) {
    this.schema = schema;
  }
  /**
   * Get method, can take in an id. Either returns all entries in the database associated with this model/schema, or returns the specific entry associated with the given id. 
   * @param {String} [_id] 
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }
  /**
   * Post method, takes in an object. Passes the object through the schema and if it is valid, saves it to the database. Returns the saved entry (if present).
   * @param {Object} record - Object containing the data to save.
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  /**
   * Put method, takes in an id and an object. Passes both the id and object through the schema and, if the data is valid, updates(overwrites) the entry at the given id.
   * @param {String} _id 
   * @param {Object} record - Object containing the data to save.
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }
  /**
   * Delete method, takes in an id and deletes the entry at the given id. 
   * @param {String} _id 
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;
