'use strict';

const os = require('os');
const util = require('util');
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
  interceptTransform(level, args) {
    const content = util.format(...args);
    let contents = { level, content, ...this.logTag };
    if (this.transform) {
      contents = this.transform(contents);
      if (contents === false) return false;
    }
    return {
      time: new Date(),
      contents,
    };
  },
  flush: 'upload',
});
