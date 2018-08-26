'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.logger.debug('debug');
    this.ctx.logger.info('info');
    this.ctx.logger.warn('warn');
    this.ctx.logger.error('error');
    this.ctx.getLogger('myLogger').info('my logger');
    this.ctx.body = 'done';
  }

  async disable() {
    this.ctx.getLogger('disabledLogger').info('disabled logger');
    this.ctx.body = 'done';
  }
}

module.exports = HomeController;
