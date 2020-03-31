const express = require('express');
const UserController = require('../controllers/UserController');
const UserValidator = require('../validator/UserValidator');
const authMiddlewares = require('../middlewares/auth');

const UserRoute = express.Router();

UserRoute.post('/authenticate', UserValidator.auth, UserController.auth);

UserRoute.post('/resgister', UserValidator.register, UserController.register);

UserRoute.get('/', authMiddlewares, UserValidator.index, UserController.index);

module.exports = UserRoute;