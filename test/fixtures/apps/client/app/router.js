'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/disable', controller.home.disable);
  router.get('/transform', controller.home.transform);
};
