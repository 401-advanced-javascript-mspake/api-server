'use strict';

/**
 * Memory Data Model module.
 * Exports the Model class (with Array 'database' as a property)  
 * @module src/api/models/memory-model
 */

const uuid = require('uuid/v4');
/**
 * Model Class
 * @constructor
 */
class Model {
  /**
   * Model constructor, takes in a schema, defines a 'database'
   * @param {Object} schema  - Schema object
   */
  constructor(schema) {
    this.schema = schema;
    this.database = [];
  }
  /**
   * Sanatize method that validates the data being passed in by checing it against the schema. 
   * @param {Object} entry 
   */
  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach( field => {
      if ( this.schema[field].required ) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });
    
    return valid ? record : undefined;
  }
  /**
   * Count method, retuns the length of the database
   */
  count() {
    return this.database.length;
  }
  /**
   * Get method, can take in an id. Either returns all entries in the 'database', or returns the specific entry associated with the given id. 
   * @param {String} [id] 
   */
  get(id) {
    const records = id ? this.database.filter( (record) => record._id === id ) : this.database;
    return Promise.resolve(records);
  }
  /**
   * Post method, takes in an object. Passes the object through the sanetize emthod and if it is valid, saves it to the 'database'. Returns the saved entry (if valid).
   * @param {Object} record - Object containing the data to save.
   */
  post(entry) {
    entry._id = uuid();
    let record = this.sanitize(entry);
    if ( record._id ) { this.database.push(record); }
    return Promise.resolve(record);
  }
  /**
   * Delete method, takes in an id and deletes the entry at the given id. 
   * @param {String} id 
   */
  delete(id) {
    this.database = this.database.filter((record) => record._id !== id );
    return this.get(id);
  }
  /**
   * Put method, takes in an id and an object. Passes the object through the sanetize method and, if the data is valid, updates(overwrites) the entry at the given id.
   * @param {String} id 
   * @param {Object} record - Object containing the data to save.
   */
  put(id, entry) {
    let record = this.sanitize(entry);
    if( record._id ) { this.database = this.database.map((item) => (item._id === id) ? record : item  ); }
    return this.get(id);
  }
  
}

module.exports = Model;