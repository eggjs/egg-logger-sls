'use strict';

const os = require('os');
const assert = require('assert');
const mock = require('egg-mock');
const sleep = require('mz-modules/sleep');

const hostname = os.hostname();

describe('test/logger.test.js', () => {
  afterEach(mock.restore);

  describe('sls client', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/client',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should upload success', async () => {
      let logs = [];
      mock(app.sls, 'postLogstoreLogs', async (g, l, group) => {
        assert(group.source === hostname);
        logs = group.logs.concat(logs);
      });
      await app.httpRequest()
        .get('/')
        .expect('done')
        .expect(200);

      await sleep(2000);

      for (const log of logs) {
        assert(typeof log.time === 'number');
        assert(String(log.time).length === 10);

        const keys = [];
        for (const { key } of log.contents) {
          keys.push(key);
        }
        assert.deepEqual(keys, [
          'level',
          'content',
          'ip',
          'hostname',
          'appName',
          'loggerName',
          'loggerFileName',
        ]);
      }
    });
  });

  describe('sls clients', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/clients',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should upload success', async () => {
      let logs = [];
      mock(app.sls, 'postLogstoreLogs', async (g, l, group) => {
        assert(group.source === hostname);
        logs = group.logs.concat(logs);
      });
      await app.httpRequest()
        .get('/')
        .expect('done')
        .expect(200);

      await sleep(2000);

      for (const log of logs) {
        assert(typeof log.time === 'number');
        assert(String(log.time).length === 10);

        const keys = [];
        for (const { key } of log.contents) {
          keys.push(key);
        }
        assert.deepEqual(keys, [
          'level',
          'content',
          'ip',
          'hostname',
          'appName',
          'loggerName',
          'loggerFileName',
        ]);
      }
    });
  });

  it('should check sls client', async () => {
    try {
      const app = mock.app({
        baseDir: 'apps/check-client',
      });
      await app.ready();
      throw new Error('should not run');
    } catch (err) {
      assert(err.message === 'app.sls is required');
    }

    try {
      const app = mock.app({
        baseDir: 'apps/check-clients',
      });
      await app.ready();
      throw new Error('should not run');
    } catch (err) {
      assert(err.message === 'app.sls.get(\'unknown\') is required');
    }
  });
});
