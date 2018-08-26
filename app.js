'use strict';

const SLSLoggerClient = require('./lib/sls_logger_client');
const SLSTransport = require('./lib/sls_transport');

module.exports = app => {
  const config = app.config.loggerSLS;
  const client = new SLSLoggerClient(app);

  for (const [ name, logger ] of app.loggers.entries()) {
    if (config.disable.includes(name)) continue;

    const transport = new SLSTransport({
      level: 'DEBUG',
      consoleLevel: 'NONE',
      client,
      env: app.config.env,
      appName: app.config.name,
      loggerName: name,
      loggerFileName: logger.options.file,
    });
    logger.set('sls', transport);
  }
};
