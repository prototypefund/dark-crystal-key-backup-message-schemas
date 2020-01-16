module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'root', 'shard', 'recipient'],
  properties: {
    type: {
      type: 'string',
      pattern: '^dark-crystal/shard$'
    },
    version: {
      type: 'string',
      pattern: '^1.0.0$'
    },
    root: {
      // TODO
    },
    shard: {
      // TODO
    },
    recipient: {
      // TODO (publickey)
    }
  }
}
