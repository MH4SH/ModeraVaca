const express = require('express');
const {errors} = require('celebrate');

const UserController = require('./controller');
const UserValidator = require('./validator');


module.exports = app => {
    app.post('/auth/authenticate', express.json(), UserValidator.auth, UserController.auth);
    app.post('/auth/register', express.json(), UserValidator.register, UserController.register);

    app.post('/auth/password', express.json(), UserValidator.getNewPassword, UserController.getNewPassword);
    app.post('/auth/password/confirm', express.json(), UserValidator.setNewPassword, UserController.setNewPassword);

    app.use('/auth', errors())
}