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

Logger transport for aliyun sls.

## Install

```bash
$ npm i egg-sls --save
$ npm i egg-logger-sls --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.sls = {
  enable: true,
  package: 'egg-sls',
};
exports.loggerSLS = {
  enable: true,
  package: 'egg-logger-sls',
};
```

## Configuration

You should configure [egg-sls] first.

```js
// {app_root}/config/config.default.js
exports.loggerSLS = {
  // sls client name
  client: null,
  // sls project name
  project: '',
  // sls logstore name
  logstore: '',
  // the list of logger name that can be disabled
  disable: [],
  // the function that can modify and filter the logs
  transform: null,
};
```

If client is not specified, it will use `app.sls` as default client, otherwise it will get the sls client with the specified name in multiple client case.

```js
// {app_root}/config/config.default.js
exports.sls = {
  clients: {
    sls: {
      endpoint: process.env.SLS_ENDPOINT,
      accessKeyId: process.env.SLS_ACCESS_KEY_ID,
      accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
    },
  },
};
exports.loggerSLS = {
  client: 'sls',
  project: '',
  logstore: '',
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Usage

The only thing you should do is configuration, this module will upload log automatically.

### Disable Logger

You and disable logger with `disable` config.

```js
exports.customLogger = {
  myLogger: {
    file: '/path/to/log',
  },
};
exports.loggerSLS = {
  disable: [
    // won't upload this logger
    'myLogger',
  ],
}
```

### Transform and Filter

You can transform the log data before upload.

```js
exports.loggerSLS = {
  transform(log) {
    return log;
  },
}
```

If you want to ignore some log, you can return false when transform.

```js
exports.loggerSLS = {
  transform(log) {
    if (some condition) return false;
    return log;
  },
}
```

### Data Structure

The data structure uploaded in below, you can create index in aliyun console as your wish.

- level: logger level
- content: the infomation that you logged
- ip: the host ip
- hostname: the host name
- env: the egg environment
- appName: the package name
- loggerName: the logger name defined by Egg
- loggerFileName: the logger file path

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

[egg-sls]: https://github.com/eggjs/egg-sls
