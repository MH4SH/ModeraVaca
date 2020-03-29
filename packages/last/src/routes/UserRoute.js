const express = require('express');
const UserController = require('../controllers/UserController');
const UserValidator = require('../validator/UserValidator');

const UserRoute = express.Router();

UserRoute.post('/resgister', UserValidator.register, UserController.register);

UserRoute.get('/', (req, res) => {
    res.status(200).json({page: 'user-get'})
});
UserRoute.get('/search', (req, res) => {
    res.status(200).json({page: 'user-search'})
});

module.exports = UserRoute;