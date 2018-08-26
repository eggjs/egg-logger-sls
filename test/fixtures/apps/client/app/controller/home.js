'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.logger.info('info');
    this.ctx.logger.warn('warn');
    this.ctx.logger.error('error');
    this.ctx.body = 'done';
  }
}

module.exports = HomeController;
