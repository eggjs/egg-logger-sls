'use strict';

const os = require('os');
const assert = require('assert');
const mock = require('egg-mock');
const sleep = require('mz-modules/sleep');

const hostname = os.hostname();

describe('test/logger.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/logger',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', async () => {
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
