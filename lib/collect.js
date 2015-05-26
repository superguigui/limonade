'use strict';

var fs = require('fs');
var isImage = require('is-image');

module.exports = function collect(inputFolder, fn) {
  return fs.readdirSync(inputFolder).filter(isImage).map(fn);
};
