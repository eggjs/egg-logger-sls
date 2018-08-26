'use strict';

const SLSLoggerClient = require('./lib/sls_logger_client');
const SLSTransport = require('./lib/sls_transport');

module.exports = app => {
  const client = new SLSLoggerClient(app);

  for (const [ name, logger ] of app.loggers.entries()) {
    const transport = new SLSTransport({
      level: 'DEBUG',
      consoleLevel: 'NONE',
      client,
      appName: app.config.name,
      loggerName: name,
      loggerFileName: logger.options.file,
    });
    logger.set('sls', transport);
  }
};
