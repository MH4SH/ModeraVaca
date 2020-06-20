const express = require("express");
const {errors} = require('celebrate')

const UserController = require('./controller');
const UserValidator = require('./validator');


module.exports = app => {
    app.post('/auth/authenticate', express.json(), UserValidator.auth, UserController.auth);
    app.post('/auth/register', express.json(), UserValidator.register, UserController.register);

    app.use('/auth', errors())
}