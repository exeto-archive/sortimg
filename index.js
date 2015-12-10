'use strict';

const path        = require('path');
const co          = require('co');
const pify        = require('pify');
const fse         = require('fs-extra');
const ProgressBar = require('progress');
const readdir     = pify(require('recursive-readdir'));
const exif        = require('./lib/exif');
const exists      = require('./lib/file-exists');

function prefInt(int) {
  if (String(int).length < 3) {
    return `00${int}`.slice(-3);
  }

  return int;
}

function sortMapValue(map) {
  const temp = [];

  for (const item of map) {
    temp.push(item);
  }

  return new Map(temp.sort((a, b) => {
    if (a[1] < b[1]) {
      return -1;
    } else if (a[1] > b[1]) {
      return 1;
    }

    return 0;
  }));
}

function getPath(date, count, dest) {
  return path.resolve(process.env.PWD, dest, `${date[0]}/${date[0]}_${date[1]}/` +
    `${date[0]}_${date[1]}_${date[2]}/${date[0]}_${date[1]}_` +
    `${date[2]}_${prefInt(count)}.jpg`);
}

module.exports = function (src, dest, remove) {
  if (!src) { throw new Error('Do not specify the path to the images'); }
  dest = typeof dest !== 'undefined' ? dest : 'sortimg-output';

  return co(function* () {
    let count = 1;
    const map = new Map();
    const dirlist = yield readdir(path.resolve(process.env.PWD, src),
      ['!*.+(jpg|jpeg|JPG|JPEG)']);

    const bar = new ProgressBar('processing [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: dirlist.length * 2,
    });

    if (remove) {
      fse.remove(path.resolve(process.env.PWD, dest));
    }

    if (!dirlist.length) {
      return console.log('There are no images in the directory');
    }

    for (const img of dirlist) {
      map.set(img, (yield exif(img)).image.ModifyDate);
      bar.tick();
    }

    for (const img of sortMapValue(map)) {
      const date = img[1].slice(0, 10).split(':');
      let newpath = getPath(date, count, dest);

      while (exists(newpath)) {
        count++;
        newpath = getPath(date, count, dest);
      }

      fse.copySync(img[0], newpath);
      count = 1;
      bar.tick();
    }
  });
};
