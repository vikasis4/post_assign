const { basename, extname } = require('path');
const { globSync } = require('glob');
const path = require('path');

// Core models are those models who need token authentication
// App models are those models who do not need token authentication
const core = path.join(__dirname, '../coreModels/*.js');
const app = path.join(__dirname, '../appModels/*.js');

const appModelFiles = globSync(app).map((filePath) => {
  const fileNameWithExtension = basename(filePath);
  const fileNameWithoutExtension = fileNameWithExtension.replace(
    extname(fileNameWithExtension),
    ''
  );
  return fileNameWithoutExtension;
});

const constrollersList = [];
const modelList = [];
const routesList = [];

const coreModelFiles = globSync(core)
for (const filePath of coreModelFiles) {
  const fileNameWithExtension = basename(filePath);
  const fileNameWithoutExtension = fileNameWithExtension.replace(
    extname(fileNameWithExtension),
    ''
  );
  const firstChar = fileNameWithoutExtension.charAt(0);
  const modelName = fileNameWithoutExtension.replace(firstChar, firstChar.toUpperCase());
  const fileNameLowerCaseFirstChar = fileNameWithoutExtension.replace(
    firstChar,
    firstChar.toLowerCase()
  );
  const entity = fileNameWithoutExtension.toLowerCase();

  controllerName = fileNameLowerCaseFirstChar + 'Controller';
  constrollersList.push(controllerName);
  modelList.push(modelName);

  const route = {
    entity: entity,
    modelName: modelName,
    controllerName: controllerName,
  };
  routesList.push(route);
}

module.exports = { constrollersList, modelList, appModelFiles, routesList };
