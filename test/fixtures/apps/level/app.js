'use strict';

module.exports = app => {
  for (const logger of app.loggers.values()) {
    logger.unredirect('error');
  }
};
