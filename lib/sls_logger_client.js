'use strict';

const os = require('os');
const assert = require('assert');
const utility = require('utility');
const hostname = os.hostname();

class Client {
  constructor(app) {
    this.app = app;

    const config = this.app.config.loggerSLS;
    let client;
    if (config.client) {
      const sls = app.sls.get(config.client);
      assert(sls && sls.postLogstoreLogs, `app.sls.get('${config.client}') is required`);
      client = sls;
    } else {
      assert(app.sls && app.sls.postLogstoreLogs, 'app.sls is required');
      client = app.sls;
    }

    this.project = config.project;
    this.logstore = config.logstore;
    this.client = client;
  }

  async upload(logs) {
    try {
      const group = this.client.createLogGroup({ source: hostname });
      for (const log of logs) {
        group.setLog(log);
      }
      await this.client.postLogstoreLogs(this.project, this.logstore, group);
    } catch (e) {
      /* istanbul ignore next */
      if (e.code !== 'PostBodyTooLarge') {
        throw e;
      }
      const logCount = logs.length;
      if (logCount === 1) {
        // 单条日志过大
        e.message = utility.logDate('.')
          + ' [egg-logger-sls] upload sls logs failed PostBodyTooLarge: ' + e.message;
        console.error(e);
      } else {
        // 多条日志超过限制，切割后上传
        const half = Math.floor(logCount / 2);
        await Promise.all([
          this.upload(logs.slice(0, half)),
          this.upload(logs.slice(half)),
        ]);
      }
    }
  }

}

module.exports = Client;
