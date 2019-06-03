'use strict';

/**
 * Model Finder module.
 * Takes in the model parameter and accesses the corresponding model module if it exists.
 * @module src/api/middleware/model-finder
 */

module.exports = (req,res,next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  req.model = require(`../models/${modelName}/${modelName}-model.js`);
  next();
};
