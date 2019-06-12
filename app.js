'use strict';

const SLSLoggerClient = require('./lib/sls_logger_client');
const SLSTransport = require('./lib/sls_transport');

module.exports = app => {
  const config = app.config.loggerSLS;
  const client = app.slsLoggerClient = new SLSLoggerClient(app);

  for (const [ name, logger ] of app.loggers.entries()) {
    if (config.disable.includes(name)) continue;

    const transport = new SLSTransport({
      level: logger.options.slsLevel || logger.options.level,
      client,
      transform: config.transform,
      env: app.config.env,
      appName: app.config.name,
      loggerName: name,
      loggerFileName: logger.options.file,
      formatter: logger.options.formatter,
      contextFormatter: logger.options.contextFormatter,
    });
    logger.set('sls', transport);
  }
};
