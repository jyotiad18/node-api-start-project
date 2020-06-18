'use strict';
const Joi = require('joi');

module.exports = {
  schema: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .error(new Error("Deparment name is required")),
      /*description: Joi.string()
        .required()
        .error(new Error("Deparment Description is required"))
      */
    })    
};