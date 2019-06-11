'use strict';

const os = require('os');
const assert = require('assert');
const hostname = os.hostname();
const Base = require('sdk-base');
const SIZE_LIMIT = 3 * 1024 * 1024;
const COUNT_LIMIT = 4096;

class Client extends Base {
  constructor(app) {
    super({});
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
    this.on('error', e => this.handleError(e));
    this.ready(true);
  }

  _createGroup(logs) {
    const group = this.client.createLogGroup({ source: hostname });
    for (const log of logs) {
      group.setLog(log);
    }
    return group;
  }

  _createGroups(logs, groupLogCount = COUNT_LIMIT) {
    // 限制单个 group log 条数为 4096
    groupLogCount = Math.min(groupLogCount, COUNT_LIMIT);
    const count = logs.length;
    const groups = [];
    for (let start = 0; start < count; start += groupLogCount) {
      const tempLogs = logs.slice(start, start + groupLogCount);
      const group = this._createGroup(tempLogs);
      const buf = group.encode();
      if (buf.length > SIZE_LIMIT) {
        // 单条过大放弃上传
        if (tempLogs.length === 1) {
          const error = new Error(`[sls/logger] single log size is ${buf.length} exceed limit ${SIZE_LIMIT}`);
          error.code = 'PostBodyTooLarge';
          this.emit('error', error);
          groups.push({ group: null, logCount: 1 });
          continue;
        }
        // 根据日志的平均大小，计算出单个 group 能容纳的 log 的条数
        const newGroupLogCount = Math.floor(SIZE_LIMIT / (buf.length / count));
        const splitedGroups = this._createGroups(tempLogs, newGroupLogCount);
        for (const splitedGroup of splitedGroups) {
          groups.push(splitedGroup);
        }
      } else {
        groups.push({ group, logCount: tempLogs.length });
      }
    }
    return groups;
  }

  async upload(logs) {
    try {
      const groups = this._createGroups(logs);
      for (const { group, logCount } of groups) {
        if (group) {
          await this.client.postLogstoreLogs(this.project, this.logstore, group);
        }
        logs.splice(0, logCount);
      }
    } catch (e) {
      e.message = '[sls/logger] post logs failed: ' + e.message;
      throw e;
    }
  }

  handleError(err) {
    this.app.logger.error(err);
  }
}

module.exports = Client;
