const basics = require('../basics')
const shard = Object.assign(basics.hexString(), { minlength: basics.MINSHARDLENGTHBYTES * 2 })

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'recipient', 'root', 'branch', 'shard', 'timestamp'],
  properties: {
    type: basics.type('reply'),
    version: basics.version('1.0.0'),
    root: basics.messageRef,
    branch: basics.messageRef,
    recipient: basics.hexString(basics.PUBLICKEYLENGTH),
    shard,
    timestamp: { type: 'integer' }
  }
}
