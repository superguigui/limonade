#! /usr/bin/env node

/*
  Usage:
    limonade [input] [output]

  Params:
    input   input folder to be scanned for images
    output  output folder where the spritesheet will be saved

  Options:
    -h, --help        show help
    -v, --version     show version
    -f, --filename    name of the spritesheet without extension
    -a, --algorithm   packing algorithm: `square`, `horizontal` or `vertical`
 */

var chalk = require('chalk');
var images = require('images');
var curry = require('lodash.curry');
var argv = require('minimist')(process.argv.slice(2));
var collect = require('./lib/collect');
var toImage = require('./lib/toImage');
var version = require('./package.json').version;

/* --------------------------------------------------------------------
  Options
-------------------------------------------------------------------- */
var inputFolder = argv._.length ? argv._[0] : '.';
var outputFolder = argv._.length > 0 ? argv._[1] : inputFolder;
var outputFilename = argv.f || argv.filename || 'sprite';
var algorithm = argv.a || argv.algorithm || 'square';
var isHelpNeeded = argv.h || argv.help || false;
var isVersionRequested = argv.v || argv.version || false;

/* --------------------------------------------------------------------
  Some Methods (impures, need to be refactored to be moved to lib)
-------------------------------------------------------------------- */
function processFiles(files, algorithm) {
  var nbImages = files.length;
  var nbImagesSqrt = Math.sqrt(nbImages);

  switch(algorithm) {
    case 'horizontal':
      return pack(files, nbImages, 1);
    break;
    case 'vertical':
      return pack(files, 1, nbImages);
    break;
    case 'square':
    default: 
      return pack(files, Math.ceil(nbImagesSqrt), Math.floor(nbImagesSqrt));
    break;
  }
}

function pack(files, nbCols, nbRows) {
  var size = files[0].size();
  var result = images(size.width * nbCols, size.height * nbRows);
  for (var i = 0, l = files.length, col, row; i < l; i++) {
    col = i % nbCols;
    row = parseInt(i / nbCols, 10);
    result.draw(files[i], col * size.width, row * size.height);
  }
  return result;
};

function showHelp() {
  var h = [
    'limonade ' + version,
    '',
    'Usage:',
    '  limonade [input] [output]',
    '',
    'Params:',
    '  input   input folder to be scanned for images',
    '  output  output folder where the spritesheet will be saved',
    '',
    'Options:',
    '  -h, --help        show help',
    '  -v, --version     show version',
    '  -f, --filename    name of the spritesheet without extension',
    '  -a, --algorithm   packing algorithm: `square`, `horizontal` or `vertical`'
  ].join('\n');
  console.log(h);
}

function showVersion() {
  console.log(version);
}

/* --------------------------------------------------------------------
  Start
-------------------------------------------------------------------- */
if(isVersionRequested) return showVersion();
if(isHelpNeeded) return showHelp();

var outputPath = outputFolder + '/' + outputFilename + '.png';
var files = collect(inputFolder, toImage(inputFolder));
var result = processFiles(files, algorithm);

result.save(outputPath);

/* --------------------------------------------------------------------
  Console Output
-------------------------------------------------------------------- */
console.log(
  chalk.blue.bold('limonade'),
  chalk.gray('just processed'),
  files.length,
  chalk.gray('images into a sprite of'),
  result.size().width + 'px',
  chalk.gray('by'),
  result.size().height + 'px',
  chalk.gray('with algorithm'),
  algorithm,
  chalk.gray('at'),
  outputPath
);