const basics = require('../basics')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'quorum', 'shards', 'timestamp'],
  properties: {
    type: basics.type('root'),
    version: basics.version('1.0.0'),
    name: { type: 'string' },
    quorum: {
      type: 'integer',
      minimum: 2,
      maximum: 255
    },
    shards: {
      type: 'integer',
      minimum: 2,
      maximum: 255
    },
    tool: { type: 'string' },
    timestamp: { type: 'integer' }
  }
}
