const { describe } = require('tape-plus')
const errorParser = require('../../lib/errorParser')
const { isShard } = require('../..')
const shardFixture = require('./v1.json')

describe('dark-crystal/shard v1 schema', context => {
  let shard

  context.beforeEach(c => {
    shard = Object.assign({}, shardFixture)
  })

  context('shard is valid', assert => {
    assert.ok(isShard(shard))
  })

  context('invalid type', assert => {
    shard.type = 'dark-smchystal/shard'
    assert.notOk(isShard(shard))

    assert.deepEqual(errorParser(isShard), ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    shard.version = 1
    assert.notOk(isShard(shard))

    assert.deepEqual(errorParser(isShard), ['data.version: No schemas match version 1'])
  })

  context('invalid shard', assert => {
    shard.shard = 'deadbeef'
    assert.notOk(isShard(shard))
    assert.deepEqual(errorParser(isShard), ['data.shard: has less length than allowed'])

    shard.shard = new Array(100).join('not hex')
    assert.notOk(isShard(shard))
    assert.deepEqual(errorParser(isShard), ['data.shard: pattern mismatch'])
  })

  context('invalid recipient', assert => {
    shard.recipient = 'kitten'
    assert.notOk(isShard(shard))
    assert.deepEqual(errorParser(isShard), ['data.recipient: pattern mismatch'])
  })

  context('invalid root', assert => {
    shard.root = 'kitten'
    assert.notOk(isShard(shard))
    assert.deepEqual(errorParser(isShard), ['data.root: pattern mismatch'])
  })

  context('invalid timestamp', assert => {
    shard.timestamp = 'now'
    assert.notOk(isShard(shard))
    assert.deepEqual(['data.timestamp: is the wrong type'], errorParser(isShard))
  })
})
