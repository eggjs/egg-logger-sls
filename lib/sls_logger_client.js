'use strict';

const os = require('os');
const hostname = os.hostname();

class Client {
  constructor(app) {
    this.app = app;
    this.client = app.sls;
    this.project = this.app.config.loggerSLS.project;
    this.logstore = this.app.config.loggerSLS.logstore;
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
