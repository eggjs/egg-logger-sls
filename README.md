# egg-logger-sls

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-logger-sls.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-logger-sls
[travis-image]: https://img.shields.io/travis/eggjs/egg-logger-sls.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-logger-sls
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-logger-sls.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-logger-sls?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-logger-sls.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-logger-sls
[snyk-image]: https://snyk.io/test/npm/egg-logger-sls/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-logger-sls
[download-image]: https://img.shields.io/npm/dm/egg-logger-sls.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-logger-sls

<!--
Description here.
-->

## Install

```bash
$ npm i egg-logger-sls --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.loggerSLS = {
  enable: true,
  package: 'egg-logger-sls',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.loggerSLS = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
