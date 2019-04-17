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

      let myLoggerInfo;
      let defaultLoggerInfo;
      let errorLoggerInfo;
      let errorClassLoggerInfo;

      for (const log of logs) {
        assert(typeof log.time === 'number');
        assert(String(log.time).length === 10);

        const keys = [];
        for (const { key, value } of log.contents) {
          keys.push(key);

          // check custom logger name
          if (/ my logger\n$/.test(value)) {
            myLoggerInfo = log;
          }
          if (/ info\n$/.test(value)) {
            defaultLoggerInfo = log;
          }
          if (/ error\n$/.test(value)) {
            errorLoggerInfo = log;
          }
          if (/ error class/.test(value)) {
            console.log(value);
            errorClassLoggerInfo = log;
            // it contains context
            assert(/\[-\/127.0.0.1/.test(value));
          }

          // level is info, won't upload debug
          assert(value !== 'debug');
        }

        if (keys.length === 8) {
          assert.deepEqual(keys, [
            'level',
            'content',
            'ip',
            'hostname',
            'env',
            'appName',
            'loggerName',
            'loggerFileName',
          ]);
        }
      }

      let result = myLoggerInfo.contents.filter(c => c.key === 'loggerName');
      assert(result[0].value === 'myLogger');

      result = defaultLoggerInfo.contents.filter(c => c.key === 'loggerName');
      assert(result[0].value === 'logger');

      result = errorLoggerInfo.contents.filter(c => c.key === 'loggerName');
      assert(result[0].value === 'errorLogger');

      result = errorClassLoggerInfo.contents.filter(c => c.key === 'errorCode');
      assert(result[0].value === 'ERROR_CLASS');
    });

    it('should not upload when disable', async () => {
      let logs = [];
      mock(app.sls, 'postLogstoreLogs', async (g, l, group) => {
        assert(group.source === hostname);
        logs = group.logs.concat(logs);
      });
      await app.httpRequest()
        .get('/disable')
        .expect('done')
        .expect(200);

      await sleep(2000);

      for (const log of logs) {
        for (const { value } of log.contents) {
          assert(value !== 'disabledLogger');
        }
      }
    });

    it('should support transform', async () => {
      let logs = [];
      mock(app.sls, 'postLogstoreLogs', async (g, l, group) => {
        assert(group.source === hostname);
        logs = group.logs.concat(logs);
      });
      await app.httpRequest()
        .get('/transform')
        .expect('done')
        .expect(200);

      await sleep(2000);

      const values = [];
      for (const log of logs) {
        for (const { key, value } of log.contents) {
          if (key === 'content' && /pass\n$/.test(value)) values.push(value);
          if (key === 'content' && value === 'args1') values.push(value);
          assert(value !== 'block');
        }
      }
      assert(values.length === 3);
      assert(/pass\n$/.test(values[0]));
      assert(/pass\n$/.test(values[1]));
      assert(values[2] === 'args1');
    });
  });

  describe('custom formatter', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/client-formatter',
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
        .get('/transform')
        .expect('done')
        .expect(200);

      await sleep(2000);

      const values = [];
      for (const log of logs) {
        for (const { key, value } of log.contents) {
          if (key === 'content') values.push(value);
        }
      }
      assert(values[values.length - 1] === 'custom contextFormatter: this is ctx\n');
      assert(values[values.length - 2] === 'custom formatter: this is app\n');
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

  describe('level', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/level',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should accept level', async () => {
      app.mockLog();
      let logs = [];
      mock(app.sls, 'postLogstoreLogs', async (g, l, group) => {
        assert(group.source === hostname);
        logs = group.logs.concat(logs);
      });
      await app.httpRequest()
        .get('/')
        .expect(200);

      await sleep(2000);

      // assert level
      app.expectLog('DEBUG');
      app.expectLog('DEBUG', 'oneLogger');

      // assert slsLevel
      const levels = [];
      for (const log of logs) {
        let level = '';
        for (const { key, value } of log.contents) {
          if (key === 'level') level += value;
          if (key === 'loggerName') level += value;
        }
        levels.push(level);
      }
      assert.deepEqual(levels, [ 'ERRORoneLogger', 'WARNlogger', 'ERRORlogger', 'ERRORerrorLogger', 'ERRORerrorLogger' ]);
    });
  });
});
