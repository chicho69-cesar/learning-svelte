const validateFields = require('./validate-fields')
const validateJWT = require('./validate-jwt')
const validateRole = require('./validate-roles')
const validateFile = require('./validate-file')

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRole,
  ...validateFile
}
