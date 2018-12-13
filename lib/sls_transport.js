'use strict';

const os = require('os');
const address = require('address');
const { wrap } = require('aggregate-base');
const { Transport } = require('egg-logger');

const ip = address.ip();
const hostname = os.hostname();

class SLSTransport extends Transport {
  constructor(options) {
    super(options);

    this.client = options.client;
    this.logTag = {
      ip,
      hostname,
      env: options.env,
      appName: options.appName,
      loggerName: options.loggerName,
      loggerFileName: options.loggerFileName,
    };
    this.transform = options.transform;
  }

  async upload(data) {
    await this.client.upload(data);
  }

}

module.exports = wrap(SLSTransport, {
  interval: 1000,
  intercept: 'log',
  interceptTransform(level, args, meta) {
    const content = this.log(level, args, meta);
    let contents = { level, content, ...this.logTag };

    // set errorCode if the first argument is the instance of Error
    const err = args[0];
    if (err instanceof Error && err.code) {
      contents.errorCode = err.code;
    }

    // support transform
    if (this.transform) {
      contents = this.transform(contents, args);
      if (contents === false) return false;
    }

    return {
      time: new Date(),
      contents,
    };
  },
  flush: 'upload',
});
