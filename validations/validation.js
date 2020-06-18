const joi = require('joi');
const _ = require('lodash');
const response = require("../helpers/response.js");

function joiValidate(params, schema, errors = []) {
    if (!schema.isJoi) {
        throw new Error("Schema has to be a Joi object");
    }
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: { objects: true }
    };
    const { error, value } = joi.validate(params, schema, options);
    
    if (error) {
      if (
        ["array", "object"].includes(schema._type) &&
        _.get(error, "details[0].path", "").includes(".")
      ) {        
        errors.push(
          error.details.map(({ message, path }) => {
            const paths = path.split(".");
            const index = paths[0].concat(
              Number.isFinite(parseInt(paths[1])) ? _.get(paths, "1", "") : ""
            );

            return `${message} at index ${index}`;
          })
        );
      } else {
        errors.push(error.message);
      }
      throw response.setError(422, errors);
    }       
    return value;
}

module.exports = {    
    joiValidate   
};