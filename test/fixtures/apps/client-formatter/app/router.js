'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/transform', controller.home.transform);
};
