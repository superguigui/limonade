'use strict';

var curry = require('lodash.curry');
var images = require('images');

module.exports = curry(function toImage(folder, file) {
  var img = images(folder + '/' + file);
  img.filename = file;
  return img;
});