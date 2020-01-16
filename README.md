

JSON and (soon) protobuf template schemas and validation for Dark Crystal key backup messages.

All messages contain a version number of the schema to allow backward compatibility when updating the schemas.

## Schemas

### `root`

This message will be published exactly once for each shared secret, and will contain a name for the secret.  It will be a private message with exactly one recipient which will be the author of the message. Custodians are not able to read it.

Its serves as a record for the secret owner, but is also referred to by the other messages.  

Example:

```js
{
  "type": "dark-crystal/root",
  "version": "1.0.0",
  "name": "directions to treasure",
  "quorum":2,
  "shards":5,
  "tool": <version of secrets module used>
}
```
with message ID.

### `shard`

This message will be published once for each shard of the secret.  It will contain a reference to the `root` message for that secret, as well as the shard itself.  The shard will be encrypted with the public key of the recipient of the shard.  This will be a private message with exactly two recipients, one of which will be the author of the message.  Note that there are two levels of encryption here, which means that the shard itself is not exposed to the author but the rest of the message is.  This allows the author to keep track of who shards have been sent to as well as to verify shard integrity when receiving the decrypted shard later.

TODO: explain using signatures for validation

Example:

```js
{
  "type": "dark-crystal/shard",
  "version": "1.0.0",
  "root": <reference to root message>,
  "shard": <shard data>,
  "recipient": <public key of recipient> 
}
```
### `Request`
```js
{ 
  "type": "dark-crystal/request",
  "version": "1.0.0",
  "recipient": <public key of recipient>, 
  "root": <reference to root message>
}
```

### `Reply`
```js
{
  "type": "dark-crystal/reply",
  "version": "1.0.0",
  "recipient": <public key of recipient>,
  "root": <reference to root message>,
  "branch": <reference to request message>,
  "shard": <encrypted shard data>
}
```
### `Forward`

This message will be published in order to send a shard to a different recipient key than that which authored the shard message. It will be a private message which exactly two recipients, one of whom will be the author of the message.  It will also contain:
- a reference to the associated `root` message
- the version number of the shard it contains
- an unencrypted shard

Example:

```js
{
  "type": "dark-crystal/forward",
  "version": "2.0.0",
  "root": <reference to root message>,
  "shard": <encrypted shard data>
  "shareVersion": '1.0.0',
  "recipient": <public key of recipient>,
}
```
