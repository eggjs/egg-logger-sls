'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async transform() {
    this.app.logger.info('this is app');
    this.ctx.logger.info('this is ctx');
    this.ctx.body = 'done';
  }
}

module.exports = HomeController;
