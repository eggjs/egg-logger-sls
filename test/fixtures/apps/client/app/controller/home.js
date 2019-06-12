'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

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

  async bigLog() {
    this.ctx.logger.info('warn: ' + crypto.randomBytes(1024 * 1024).toString('hex'));
    this.ctx.logger.info('warn: ' + crypto.randomBytes(1024 * 1024).toString('hex'));
    this.ctx.logger.info('warn: ' + crypto.randomBytes(1024 * 1024).toString('hex'));
    this.ctx.logger.info('warn: ' + crypto.randomBytes(1024 * 1024).toString('hex'));
    this.ctx.body = 'done';
  }

  async lotLog() {
    for (let i = 0; i < 18432; i++) {
      this.ctx.logger.info('info: lot log');
    }
    this.ctx.body = 'done';
  }

  async singleBigLog() {
    this.ctx.logger.info('warn: ' + crypto.randomBytes(1024 * 1024 * 2).toString('hex'));
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
