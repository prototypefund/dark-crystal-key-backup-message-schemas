

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
  "tool": "secrets.js@1.4.5",
  "recipients": [<key of secret owner>]
}
```
with message ID.

### `shard`

This message will be published once for each shard of the secret.  It will contain a reference to the `root` message for that secret, as well as the shard itself.  The shard will be encrypted with the public key of the recipient of the shard.  This will be a private message with exactly two recipients, one of which will be the author of the message.  Note that there are two levels of encryption here, which means that the shard itself is not exposed to the author but the rest of the message is.  This allows the author to keep track of who shards have been sent to as well as to verify shard integrity when receiving the decrypted shard later.

Example:

```js
{
  "type": "dark-crystal/shard",
  "version": "1.0.0",
  "root": "%viiJnnnXjNkfCALivEZbrDe8UndkCCCNQ/CgBOWgJLw=.sha256",
  "shard": "Yn3foQzIrckEh139UbZ2JYuQI9FSJ3lBEV7wcePeFc/Eeo0t9kfrNp+9+bZio76RTJOM7pVEo1AUJFFupGStwNHtXmcQ9msnvnvR1RW5qLxX3luNMe+m45jcDLDCwPU237TJFIqYbUbd/DeI3YFiFH+AMU8XAPTV9scukFMVSTDrr/Li6fI=.box",
  "recps": ["@LA9HYf5rnUJFHHTklKXLLRyrEytayjbFZRo76Aj/qKs=.ed25519", "@95WQAJ1XZju4YFpLib3JYdbx//BCtr5dq3bR9jPxYWs=.ed25519"]
}
```
### `Request`
```js
{ 
  "type": "request",
  "version": "1.0.0",
  "recps": ["grace.id", "server.id"], 
  "root": <reference to root message>
}
```

### `Reply`
```js
{
  "type": "invite-reply",
  "version": "1.0.0",
  "recipients": [grace.id, server.id],
  "root": <reference to root message>,
  "branch": <reference to request message>,
  "shard": <shard data>
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
  "root": "%viiJnnnXjNkfCALivEZbrDe8UndkCCCNQ/CgBOWgJLw=.sha256",
  "shard": "802Eh139UbZ2JYuQI9FSJ3lBEV7wcePeFc/Eeo0t9kfrNp+fg9bZio76RTJOM7pVEo1AUJFFupGStwNHtXmcQ9msnvnvR1RW5qLxX3luNMem45jcDLDCwPU237TJFIqYbUbd/DeI3YFiFH+AMU8XAPTV9scukFMV",
  "shareVersion": '1.0.0',
  "recps": ["@LA9HYf5rnUJFHHTklKXLLRyrEytayjbFZRo76Aj/qKs=.ed25519", "@95WQAJ1XZju4YFpLib3JYdbx//BCtr5dq3bR9jPxYWs=.ed25519"]
}
```
