const isCanonicalBase64 = require('is-canonical-base64')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'recipient', 'root'],
  properties: {
    type: {
      type: 'string',
      pattern: '^dark-crystal/request$'
    },
    version: {
      type: 'string',
      pattern: '^1.0.0$'
    },
    root: {

    },
    ephemeralPublicKey: {
      type: 'string',
      pattern: isCanonicalBase64(null, '\.curve25519', 32)
    }
  }
}
