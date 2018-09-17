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
};

exports.logger = {
  level: 'DEBUG',
  slsLevel: 'WARN',
};

exports.customLogger = {
  oneLogger: {
    file: path.join(__dirname, '../logs/1.log'),
    slsLevel: 'ERROR',
  },
};
