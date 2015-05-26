'use strict';

var curry = require('lodash.curry');
var images = require('images');

module.exports = curry(function toImage(folder, file) {
  return images(folder + '/' + file);
});