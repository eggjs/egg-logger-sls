'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.logger.debug('debug');
    this.ctx.logger.info('info');
    this.ctx.logger.warn('warn');
    this.ctx.logger.error('error');
    this.ctx.getLogger('myLogger').info('my logger');
    const err = new Error('error class');
    err.code = 'ERROR_CLASS';
    this.ctx.logger.error(err);
    this.ctx.body = 'done';
  }

  async disable() {
    this.ctx.getLogger('disabledLogger').info('disabled logger');
    this.ctx.body = 'done';
  }

  async transform() {
    this.ctx.logger.info('pass');
    this.ctx.logger.info('block');
    this.ctx.logger.info('pass');
    this.ctx.logger.info('args');
    this.ctx.body = 'done';
  }
}

module.exports = HomeController;
