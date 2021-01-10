const { checkSchema, validationResult } = require('express-validator')
const schemaService = require('./schemaService')

const validateSchema = keySchema => {
  return checkSchema(schemaService[keySchema].validations)
}

const validateSchemaResult = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = errors.array().map(err => { return { [err.param]: err.msg } })

  return res.status(422).json({
    message: 'Unprocessable Entity',
    errors: extractedErrors
  })
}

module.exports = {
  validateSchema,
  validateSchemaResult
}


