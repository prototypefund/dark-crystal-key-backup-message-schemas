module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'name', 'quorum', 'shards'],
  properties: {
    type: {
      type: 'string',
      pattern: '^dark-crystal/root$'
    },
    version: {
      type: 'string',
      pattern: '^1.0.0$'
    },
    name: { type: 'string' },
    quorum: {
      type: 'integer',
      minimum: 2
    },
    shards: {
      type: 'integer',
      minimum: 2
    },
    tool: { type: 'string' }
  }
}
