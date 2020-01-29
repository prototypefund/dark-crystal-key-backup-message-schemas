module.exports = {
  PUBLICKEYLENGTH: 32, // TODO
  ENCRYPTIONPUBLICKEYLENGTH: 32, // TODO
  MINSHARDLENGTHBYTES: 32,
  messageRef: hexString(32),
  version (versionSemVer) {
    return {
      type: 'string',
      pattern: `^${versionSemVer}$`
    }
  },
  type (typeString) {
    return {
      type: 'string',
      pattern: `^dark-crystal/${typeString}$`
    }
  },
  hexString
}

// Regular expression for a hex encoded public key or hash
// If no length is given, any length is accepted
function hexString (lengthBytes) {
  return lengthBytes
    ? {
      type: 'string',
      pattern: `^[0-9a-fA-F]{${lengthBytes * 2}}$`
    }
    : {
      type: 'string',
      pattern: '[0-9a-fA-F]+'
    }
}

// Pattern for a scuttlebutt-style base64 curve25519 key
// pattern: isCanonicalBase64(null, '\.curve25519', 32)
