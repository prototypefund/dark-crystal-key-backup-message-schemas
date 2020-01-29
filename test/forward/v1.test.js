const { describe } = require('tape-plus')
const errorParser = require('../../lib/errorParser')
const { isForward } = require('../..')
const forwardFixture = require('./v1.json')

describe('dark-crystal/forward v1 schema', context => {
  let forward

  context.beforeEach(c => {
    forward = Object.assign({}, forwardFixture)
  })

  context('forward is valid', assert => {
    assert.ok(isForward(forward))
  })

  context('forward is valid without branch', assert => {
    delete forward.branch
    assert.ok(isForward(forward))
  })

  context('invalid type', assert => {
    forward.type = 'dark-smchystal/forward'
    assert.notOk(isForward(forward))
    assert.deepEqual(errorParser(isForward), ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    forward.version = 1
    assert.notOk(isForward(forward))
    assert.deepEqual(errorParser(isForward), ['data.version: No schemas match version 1'])
  })

  context('invalid shard', assert => {
    forward.shard = 2
    assert.notOk(isForward(forward))
    assert.deepEqual(errorParser(isForward), ['data.shard: is the wrong type'])
  })

  context('invalid recipient', assert => {
    forward.recipient = 'thisisnotapublickey'
    assert.notOk(isForward(forward))
    assert.deepEqual(errorParser(isForward), ['data.recipient: pattern mismatch'])
  })

  context('invalid root', assert => {
    forward.root = 'thisisnotarootid'
    assert.notOk(isForward(forward))
    assert.deepEqual(errorParser(isForward), ['data.root: pattern mismatch'])
  })

  context('invalid branch', assert => {
    forward.branch = 'thisisnotabranchid'
    assert.notOk(isForward(forward))
    assert.deepEqual(errorParser(isForward), ['data.branch: pattern mismatch'])
  })

  context('invalid timestamp', assert => {
    forward.timestamp = 'thisisnotatimestamp'
    assert.notOk(isForward(forward))
    assert.deepEqual(errorParser(isForward), ['data.timestamp: is the wrong type'])
  })
})
