const { describe } = require('tape-plus')
const errorParser = require('../../lib/errorParser')
const { isReply } = require('../..')
const replyFixture = require('./v1.json')

describe('dark-crystal/reply v1 schema', context => {
  let reply

  context.beforeEach(c => {
    reply = Object.assign({}, replyFixture)
  })

  context('reply is valid', assert => {
    assert.ok(isReply(reply))
  })

  context('invalid type', assert => {
    reply.type = 'dark-smchystal/reply'
    assert.notOk(isReply(reply))
    assert.deepEqual(errorParser(isReply), ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    reply.version = 1
    assert.notOk(isReply(reply))
    assert.deepEqual(errorParser(isReply), ['data.version: No schemas match version 1'])
  })

  context('invalid recipient', assert => {
    reply.recipient = 'kitten'
    assert.notOk(isReply(reply))
    assert.deepEqual(errorParser(isReply), ['data.recipient: pattern mismatch'])
  })

  context('invalid root', assert => {
    reply.root = 'kitten'
    assert.notOk(isReply(reply))
    assert.deepEqual(errorParser(isReply), ['data.root: pattern mismatch'])
  })

  context('invalid branch', assert => {
    reply.branch = 'kitten'
    assert.notOk(isReply(reply))
    assert.deepEqual(errorParser(isReply), ['data.branch: pattern mismatch'])
  })

  context('invalid shard', assert => {
    reply.shard = 'deadbeef'
    assert.notOk(isReply(reply))
    assert.deepEqual(errorParser(isReply), ['data.shard: has less length than allowed'])

    reply.shard = new Array(100).join('not hex')
    assert.notOk(isReply(reply))
    assert.deepEqual(errorParser(isReply), ['data.shard: pattern mismatch'])
  })
  context('invalid timestamp', assert => {
    reply.timestamp = 'now'
    assert.notOk(isReply(reply))
    assert.deepEqual(['data.timestamp: is the wrong type'], errorParser(isReply))
  })
})
