const express = require('express');

const router = express.Router();

const { catchErrors } = require('@/handlers/errorHandlers');
const userController = require('@/controllers/appControllers/userController');

router.route('/user/login').post(catchErrors(userController.login));
router.route('/user/create').post(catchErrors(userController.create));
router.route('/user/logout').post(catchErrors(userController.logout));

module.exports = router;
