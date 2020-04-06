const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const userDAO = require('../db/daos/user');
const roleDAO = require('../db/daos/role');
const userService = require('../services/user');

const verifyUserToken = require('../middlewares/authentication.middleware');
const validateCapabilities = require('../middlewares/capability.middleware');
const config = require('../middlewares/roles.config');

/* Public routes */

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

/* Routes with roles */

router.get('/users',
    verifyUserToken,
    (request, response, next) => validateCapabilities(request, response, next, [config.GET_USERS]),
    asyncHandler(async (request, response) => {
    if(!request.error) {
        const users = await userDAO.getAllUsers();
        response.status(200).json({ "users": users });
    } else {
        response.status(403).json({ "error": request.error });
    }
}));

router.get('/roles',
    verifyUserToken,
    (request, response, next) => validateCapabilities(request, response, next, [config.GET_ROLES]),
    asyncHandler(async (request, response) => {
    if(!request.error) {
        const roles = await roleDAO.getAllRoles();
        response.status(200).json({ "roles": roles });
    } else {
        response.status(403).json({ "error": request.error });
    }
}));

router.get('/capabilities',
    verifyUserToken,
    (request, response, next) => validateCapabilities(request, response, next, [config.GET_CAPABILITIES]),
    asyncHandler(async (request, response) => {
    if(!request.error) {
        const capabilities = await roleDAO.getAllCapabilities();
        response.status(200).json({ "capabilities": capabilities });
    } else {
        response.status(403).json({ "error": request.error });
    }
}));

router.post('/register',
    verifyUserToken,
    (request, response, next) => validateCapabilities(request, response, next, [config.ADD_NEW_USER]),
    asyncHandler(async (request, response) => {
    if(!request.error) {
        const { username, password } = request.body;

        try {
            const result = await userService.createUser(username, password);

            response.status(200).json({ result });
        } catch (error) {
            response.status(403).send(error.message);
        }
    } else {
        response.status(403).json({ "error": request.error });
    }
}));

module.exports = router;