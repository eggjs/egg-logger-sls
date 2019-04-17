'use strict';

exports.keys = '123456';

exports.sls = {
  client: {
    endpoint: process.env.SLS_ENDPOINT,
    accessKeyId: process.env.SLS_ACCESS_KEY_ID,
    accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
  },
};

exports.logger = {
  formatter(meta) {
    return `custom formatter: ${meta.message}`;
  },
  contextFormatter(meta) {
    return `custom contextFormatter: ${meta.message}`;
  },
};

exports.loggerSLS = {
  project: 'egg-sls-post-log',
  logstore: 'egg-sls-post-log',
  disable: [
    'disabledLogger',
  ],
};

