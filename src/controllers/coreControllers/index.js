const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const { routesList } = require('@/models/utils');

const { globSync } = require('glob');
const path = require('path');

const pattern = './src/controllers/coreControllers/*/**/';
const controllerDirectories = globSync(pattern).map((filePath) => {
  return path.basename(filePath);
});
/* right now we have only postController but in future when our application will SCALE
we will have multiple controller, so using this file we can automate the process */

const coreControllers = () => {
  const controllers = {};
  const hasCustomControllers = [];

  controllerDirectories.forEach((controllerName) => {
    try {

      const customController = require('@/controllers/coreControllers/' + controllerName);

      if (customController) {
        hasCustomControllers.push(controllerName);
        controllers[controllerName] = customController;
      }
    } catch (err) {
      throw new Error(err);
    }
  });

  routesList.forEach(({ modelName, controllerName }) => {
    if (!hasCustomControllers.includes(controllerName)) {
      controllers[controllerName] = createCRUDController(modelName);
    }
  });

  return controllers;
};

module.exports = coreControllers();