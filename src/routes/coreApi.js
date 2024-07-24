const express = require('express');
const { catchErrors } = require('@/handlers/errorHandlers');
const router = express.Router();

const coreControllers = require('@/controllers/coreControllers/');
const { routesList } = require('@/models/utils');

const routerApp = (entity, controller) => {
  router.route(`/${entity}/create`).post(catchErrors(controller['create']));
  router.route(`/${entity}/read/:id`).get(catchErrors(controller['read']));
  router.route(`/${entity}/update/:id`).patch(catchErrors(controller['update']));
  router.route(`/${entity}/delete/:id`).delete(catchErrors(controller['delete']));
  router.route(`/${entity}/listAll/:val/:type`).get(catchErrors(controller['listAll']));
  router.route(`/${entity}/filter`).get(catchErrors(controller['filter']));
};
routesList.forEach(({ entity, controllerName }) => {
  const controller = coreControllers[controllerName];
  routerApp(entity, controller);
});

module.exports = router;