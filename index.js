#! /usr/bin/env node

/*
  limonade inputFolder outputFolder [-a toto]
 */

// modules
var fs = require('fs');
var chalk = require('chalk');
var isImage = require('is-image');
var images = require('images');
var argv = require('minimist')(process.argv.slice(2));

// constants
var algorithms = ['square', 'horizontal', 'vertical'];

// options
var inputFolder = argv._.length ? argv._[0] : '.';
var outputFolder = argv._.length > 0 ? argv._[1] : inputFolder;
var outputFilename = argv.f || argv.filename || 'sprite';
var algorithm = argv.a || argv.algorithm;
if(!algorithm || algorithms.indexOf(algorithm) < 0) algorithm = algorithms[0];

console.log('algo', algorithm);

// process files
var files = fs.readdirSync(inputFolder).filter(isImage).map(function(file) {
  return images(inputFolder + '/' + file);
});

// packing algorithm
var nbImages = files.length;
var nbImagesSqrt = Math.sqrt(nbImages);
var nbLines = Math.floor(nbImagesSqrt);
var nbCols = Math.ceil(nbImagesSqrt);
var w = files[0].size().width;
var h = files[0].size().height;
var result = images(w * nbCols, h * nbLines);

// draw the images in result image
for (var i = 0, c, l; i < nbImages; i++) {
  c = i % nbCols;
  l = parseInt(i / nbCols, 10);
  result.draw(files[i], c * w, l * h);
}

// save final image
var outputPath = outputFolder + '/' + outputFilename + '.png';
result.save(outputPath);

function pack(files, nbRows, nbLines) {
  for (var i = 0, l = files.length, col, row; i < l; i++) {
    col = i % nbCols;
    row = parseInt(i / nbCols, 10);
    result.draw(files[i], c * w, l * h);
  }
}

// Console output
console.log(
  chalk.blue.bold('limonade'),
  chalk.gray('just processed'),
  nbImages,
  chalk.gray('images into a'),
  nbCols,
  chalk.gray('columns and'),
  nbLines,
  chalk.grey('rows image of'),
  (nbCols * w) + 'px',
  chalk.gray('by'),
  nbLines * h + 'px',
  chalk.gray('at'),
  outputPath
);