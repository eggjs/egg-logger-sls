'use strict';

const path = require('path');

exports.keys = '123456';

exports.sls = {
  client: {
    endpoint: process.env.SLS_ENDPOINT,
    accessKeyId: process.env.SLS_ACCESS_KEY_ID,
    accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
  },
};

exports.loggerSLS = {
  project: 'egg-sls-post-log',
  logstore: 'egg-sls-post-log',
  disable: [
    'disabledLogger',
  ],
  transform(log, args) {
    if (args[0] === 'args') log.content = 'args1';
    if (log.content === 'block') return false;
    return log;
  },
};

exports.customLogger = {
  myLogger: {
    file: path.join(__dirname, '../logs/my.log'),
  },
  disabledLogger: {
    file: path.join(__dirname, '../logs/disabled.log'),
  },
};
