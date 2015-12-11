# sortimg [![Dependency Status][depstat-image]][depstat-url]

Sorting photos based on EXIF data.

## Install

```bash
$ npm install -g sortimg
```

## Usage

Output format: `YYYY/YYYY_MM/YYYY_MM_DD/YYYY_MM_DD_001.jpg`

```bash
$ sortimg --help

  Usage: sortimg [options] <dir> [dest dir]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -r, --remove   delete the output directory before processing
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](http://exeto.me/)

[depstat-url]: https://gemnasium.com/exeto/sortimg
[depstat-image]: https://img.shields.io/gemnasium/exeto/sortimg.svg?style=flat
