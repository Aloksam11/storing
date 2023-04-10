'use strict';

let data = 'stackabuse.com';
let buff = new Buffer.from(data);
let base64data = buff.toString('base64');

console.log('"' + data + '" converted to Base64 is "' + base64data + '"');