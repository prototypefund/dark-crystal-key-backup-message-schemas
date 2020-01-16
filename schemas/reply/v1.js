module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'recipient', 'root', 'branch', 'shard'],
  properties: {
    type: {
      type: 'string',
      pattern: '^dark-crystal/reply$'
    },
    version: {
      type: 'string',
      pattern: '^1.0.0$'
    },
    root: {

    },
    branch: {
      // ref to request
    },
    recipient: {
      // TODO
    },
    shard: {
      // TODO
    }
  }
}
