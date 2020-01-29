const basics = require('../basics')
const shard = Object.assign(basics.hexString(), { minLength: basics.MINSHARDLENGTHBYTES * 2 })

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'root', 'shard', 'recipient', 'timestamp'],
  properties: {
    type: basics.type('shard'),
    version: basics.version('1.0.0'),
    root: basics.messageRef,
    shard,
    recipient: basics.hexString(basics.PUBLICKEYLENGTH),
    timestamp: { type: 'integer' }
  }
}
