'use strict';

exports.keys = '123456';

exports.sls = {
  clients: {
    sls1: {
      endpoint: process.env.SLS_ENDPOINT,
      accessKeyId: process.env.SLS_ACCESS_KEY_ID,
      accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
    },
  },
};

exports.loggerSLS = {
  client: 'sls1',
  project: 'egg-sls-post-log',
  logstore: 'egg-sls-post-log',
};
