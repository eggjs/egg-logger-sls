'use strict';

const os = require('os');
const assert = require('assert');
const hostname = os.hostname();

class Client {
  constructor(app) {
    this.app = app;

    const config = this.app.config.loggerSLS;
    let client;
    if (config.client) {
      const sls = app.sls.get(config.client);
      assert(sls, `app.sls.get('${config.client}') is required`);
      client = sls;
    } else {
      assert(app.sls, 'app.sls is required');
      client = app.sls;
    }

    this.project = config.project;
    this.logstore = config.logstore;
    this.client = client;
  }

  async upload(logs) {
    const group = this.client.createLogGroup({ source: hostname });
    for (const log of logs) {
      group.setLog(log);
    }
    await this.client.postLogstoreLogs(this.project, this.logstore, group);
  }

}

module.exports = Client;
