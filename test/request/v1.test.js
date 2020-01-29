const { describe } = require('tape-plus')
const errorParser = require('../../lib/errorParser')
const { isRequest } = require('../..')
const requestFixture = require('./v1.json')

describe('dark-crystal/request v1 schema', context => {
  let request

  context.beforeEach(c => {
    request = Object.assign({}, requestFixture)
  })

  context('request is valid', assert => {
    assert.ok(isRequest(request))
  })

  context('request is valid without ephemeral key', assert => {
    delete request.ephemeralPublicKey
    assert.ok(isRequest(request))
  })

  context('invalid ephemeral public key', assert => {
    request.ephemeralPublicKey = 'kitten'
    assert.notOk(isRequest(request))
    assert.deepEqual(errorParser(isRequest), ['data.ephemeralPublicKey: pattern mismatch'])
  })

  context('invalid type', assert => {
    request.type = 'dark-smchystal/request'
    assert.notOk(isRequest(request))
    assert.deepEqual(errorParser(isRequest), ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    request.version = 1
    assert.notOk(isRequest(request))
    assert.deepEqual(errorParser(isRequest), ['data.version: No schemas match version 1'])
  })

  context('invalid recipient', assert => {
    request.recipient = 'kitten'
    assert.notOk(isRequest(request))
    assert.deepEqual(errorParser(isRequest), ['data.recipient: pattern mismatch'])
  })

  context('invalid root', assert => {
    request.root = 'kitten'
    assert.notOk(isRequest(request))
    assert.deepEqual(errorParser(isRequest), ['data.root: pattern mismatch'])
  })

  context('invalid timestamp', assert => {
    request.timestamp = 'now'
    assert.notOk(isRequest(request))
    assert.deepEqual(['data.timestamp: is the wrong type'], errorParser(isRequest))
  })
})
