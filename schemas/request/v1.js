const basics = require('../basics')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'recipient', 'root', 'timestamp'],
  properties: {
    type: basics.type('request'),
    version: basics.version('1.0.0'),
    root: basics.messageRef,
    recipient: basics.hexString(basics.PUBLICKEYLENGTH),
    ephemeralPublicKey: basics.hexString(basics.ENCRYPTIONPUBLICKEYLENGTH),
    timestamp: { type: 'integer' }
  }
}
