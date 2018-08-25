'use strict';

/**
 * egg-logger-sls default config
 * @member Config#loggerSLS
 * @property {String} client - some description
 */
exports.loggerSLS = {
  client: null,
  project: 'egg-sls-post-log',
  logstore: 'egg-sls-post-log',
  disable: [],
};

exports.sls = {
  client: {
    endpoint: process.env.SLS_ENDPOINT,
    accessKeyId: process.env.SLS_ACCESS_KEY_ID,
    accessKeySecret: process.env.SLS_ACCESS_KEY_SECRET,
  },
};
