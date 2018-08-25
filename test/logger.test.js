'use strict';

const mock = require('egg-mock');
const sleep = require('mz-modules/sleep');

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
    await app.httpRequest()
      .get('/')
      .expect('done')
      .expect(200);

    await sleep(2000);
  });
});
