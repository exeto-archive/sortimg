#!/usr/bin/env node

'use strict';

const program = require('commander');
const sortimg = require('../');

program
  .version('0.1.0')
  .description('Sorting photos based on EXIF data')
  .usage('[options] <dir> [dest dir]')
  .option('-r, --remove', 'delete the output directory before processing')
  .parse(process.argv);

if (process.argv.length > 2) {
  sortimg(program.args[0], program.args[1], program.remove)
    .catch(err => console.error(err.message));
} else {
  program.help();
}
