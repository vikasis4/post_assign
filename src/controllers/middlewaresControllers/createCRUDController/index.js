const { modelList } = require('@/models/utils');

const mongoose = require('mongoose');

const create = require('./create');
const read = require('./read');
const update = require('./update');
const remove = require('./delete');
const filter = require('./filter');
const listAll = require('./listAll');

const createCRUDController = (modelName) => {
  if (!modelList.includes(modelName)) {
    throw new Error(`Model ${modelName} does not exist`);
  }

  const Model = mongoose.model(modelName);
  let crudMethods = {
    create: (req, res) => create(Model, req, res),
    read: (req, res) => read(Model, req, res),
    update: (req, res) => update(Model, req, res),
    delete: (req, res) => remove(Model, req, res),
    listAll: (req, res) => listAll(Model, req, res),
    filter: (req, res) => filter(Model, req, res),
  };
  return crudMethods;
};

module.exports = createCRUDController;
