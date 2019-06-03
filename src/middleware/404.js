'use strict';

/**
 * 404 module.
 * Returns a 404 error to the front end if the route assessed does not exist.
 * @module src/api/middleware/404
 */

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error).end();
};
