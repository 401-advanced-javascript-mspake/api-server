'use strict';

/**
 * 404 module.
 * Returns a 500 error to the front end if a server error occurs.
 * @module src/api/middleware/500
 */

module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.status(500).json(error).end();
};
