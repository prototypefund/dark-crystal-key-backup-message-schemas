const Validator = require('ssb-schema-validation')
const errorParser = require('./lib/errorParser')
const schemas = require('./schemas')

module.exports = {
  isRoot: Validator(schemas.root),
  isShard: Validator(schemas.shard),
  isRequest: Validator(schemas.request),
  isReply: Validator(schemas.reply),
  isForward: Validator(schemas.forward),
  errorParser
}
