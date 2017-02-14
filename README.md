[View on NPM][npm]

## Installation
```
npm install passwort --save
```

## Example Usage
```
var passwort = require('passwort');

var pw = passwort.create({
  algorithm: 'sha1'
});

var input = 'passwort';

var hash = await pw.hash(input);
var matches = await pw.verify(input, hash);

console.log('input =', input);
console.log('hash =', hash);
console.log('matching =', match?'yes':'no');
```
[npm]: https://www.npmjs.com/package/passwort