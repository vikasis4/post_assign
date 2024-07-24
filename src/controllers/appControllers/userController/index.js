const login = require('./login');
const logout = require('./logout');
const create = require('./create');

const createAuthMiddleware = () => {

  const userModel = 'User'
  let authMethods = {};

  authMethods.login = (req, res) =>
    login(req, res, {
      userModel,
    });

  authMethods.create = (req, res) =>
    create(req, res, {
      userModel,
    });

  authMethods.logout = (req, res) =>
    logout(req, res, {
      userModel,
    });
  return authMethods;
};

module.exports = createAuthMiddleware();