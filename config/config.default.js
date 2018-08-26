'use strict';

/**
 * default config
 * @member Config#loggerSLS
 * @property {String} client - sls client name in egg-sls
 * @property {String} project - sls project name
 * @property {String} logstore - sls logstore name
 * @property {Array} disable - the list of logger name that can be disabled
 * @property {Function} transform - the function that can modify and filter the logs
 */
exports.loggerSLS = {
  client: null,
  project: '',
  logstore: '',
  disable: [],
  transform: null,
};
