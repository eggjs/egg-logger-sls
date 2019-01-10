'use strict';

/**
 * default config
 * @member Config#loggerSLS
 * @property {String} client - sls client name in egg-sls
 * @property {String} project - sls project name
 * @property {String} logstore - sls logstore name
 * @property {String} topic - sls topic
 * @property {String} source - sls source
 * @property {Array} disable - the list of logger name that can be disabled
 * @property {Function} transform - the function that can modify and filter the logs
 */
exports.loggerSLS = {
  client: null,
  project: '',
  logstore: '',
  topic: '',
  source: '',
  disable: [],
  transform: null,
};
