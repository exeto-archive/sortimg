/* eslint  no-new: 0 */
'use strict';

const ExifImage = require('exif').ExifImage;

module.exports = function (img) {
  return new Promise(function (resolve, reject) {
    new ExifImage({ image: img }, function (err, data) {
      if (err) {
        return reject(new Error(err));
      }

      resolve(data);
    });
  });
};
