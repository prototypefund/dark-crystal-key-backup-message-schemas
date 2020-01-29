const { describe } = require('tape-plus')
const errorParser = require('../../lib/errorParser')
const { isRoot } = require('../..')
const rootFixture = require('./v1.json')

describe('dark-crystal/root v1 schema', context => {
  
  let root

  context.beforeEach((c) => {
    root = Object.assign({}, rootFixture)
  })


  context('root is valid', assert => {
    assert.ok(isRoot(root))
  })

  context('invalid type', assert => {
    root.type = 'dark-smchystal/root'
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.type: pattern mismatch'], errorParser(isRoot))
  })

  context('invalid version', assert => {
    root.version = 1
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.version: No schemas match version 1'], errorParser(isRoot))
  })

  context('invalid name', assert => {
    root.name = { name: 'this is my name' }
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.name: is the wrong type'], errorParser(isRoot))
  })

  context('invalid tool', assert => {
    root.tool = 5
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.tool: is the wrong type'], errorParser(isRoot))
  })

  context('invalid quorum', assert => {
    root.quorum = 1
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.quorum: is less than minimum'], errorParser(isRoot))

    root.quorum = 256
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.quorum: is more than maximum'], errorParser(isRoot))
  })

  context('invalid number of shards', assert => {
    root.shards = 1
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.shards: is less than minimum'], errorParser(isRoot))

    root.shards = 256
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.shards: is more than maximum'], errorParser(isRoot))
  })

  context('invalid timestamp', assert => {
    root.timestamp = 'now'
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.timestamp: is the wrong type'], errorParser(isRoot))
  })
})
