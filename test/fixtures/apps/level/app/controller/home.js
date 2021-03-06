'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.logger.debug('debug');
    this.ctx.logger.info('info');
    this.ctx.logger.warn('warn');
    this.ctx.logger.error('error');
    this.ctx.getLogger('oneLogger').debug('debug');
    this.ctx.getLogger('oneLogger').info('info');
    this.ctx.getLogger('oneLogger').warn('warn');
    this.ctx.getLogger('oneLogger').error('error');
    this.ctx.body = 'done';
  }
}

module.exports = HomeController;
