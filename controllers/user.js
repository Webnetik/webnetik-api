const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const userDAO = require('../db/daos/user');
const userService = require('../services/user');

const verifyUserToken = require('../middlewares/authentication.middleware');

router.get('/users', verifyUserToken, asyncHandler(async (request, response) => {
    if(!request.error) {
        const users = await userDAO.getAllUsers();
        response.status(200).json({ "users": users });
    } else {
        response.status(403).json({ "error": request.error });
    }
}));

router.post('/login', asyncHandler(async (request, response) => {
    const { username, password } = request.body;

    try {
        const token = await userService.login(username, password);

        response.status(200).json({ token });
    } catch (error) {
        response.status(403).send(error.message);
    }
}));

router.post('/validate', asyncHandler(async (request, response) => {
    const { token } = request.body;

    try {
        const result = await userService.validateUserToken(token);

        response.status(200).json({ result });
    } catch (error) {
        response.status(403).send(error.message);
    }
}));

module.exports = router;