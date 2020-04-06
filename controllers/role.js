const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const roleDAO = require('../db/daos/role');

const verifyUserToken = require('../middlewares/authentication.middleware');
const validateCapabilities = require('../middlewares/capability.middleware');
const config = require('../middlewares/roles.config');

router.post('/changeCapabilities',
    verifyUserToken,
    (request, response, next) => validateCapabilities(request, response, next, [config.CHANGE_ROLE_CAPABILITIES]),
    asyncHandler(async (request, response) => {
    const { roleId, capabilities } = request.body;

    try {
        const result = await roleDAO.changeRoleCapabilities(roleId, capabilities);

        response.status(200).json({ result });
    } catch (error) {
        response.status(403).send(error.message);
    }
}));

router.post('/create',
    verifyUserToken,
    (request, response, next) => validateCapabilities(request, response, next, [config.ADD_NEW_ROLE]),
    asyncHandler(async (request, response) => {
    const { roleName } = request.body;

    try {
        const result = await roleDAO.createRole(roleName);

        response.status(200).json({ result });
    } catch (error) {
        response.status(403).send(error.message);
    }
}));

module.exports = router;