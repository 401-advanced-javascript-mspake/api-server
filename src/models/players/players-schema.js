'use strict';

/**
 * Players Schema module.
 * Exports a mongoose schema
 * @module src/api/models/players/players-schema
 */

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

/**
 * Player schema
 * @constant schema
 */
const players = mongoose.Schema({
  name: { type:String, required:true },
  position: { type:String, required:true, uppercase:true, enum:['P','C','1B','2B','3B','SS','LF','RF','CF'] },
  throws: { type:String, required:true, uppercase:true, enum:['R','L'] },
  bats: { type:String, required:true, uppercase:true, enum:['R','L'] },
  team: {type:String, required:true},
});

module.exports = mongoose.model('players', players);
