const mongoose = require('mongoose');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

/* we can create functions like this and can use them, when we have to scale our app */

const filter = require('./filter');


function modelController() {
  const Model = mongoose.model('Post');
  const methods = createCRUDController('Post');

  /* if default and simple CRUD controllers cannot satisfy the logic then, custom controller can override
   the default function or we can add new function which is not present in the default CRUD controller */

  methods.filter = (req, res) => filter(Model, req, res);

  return methods;
}

module.exports = modelController();
