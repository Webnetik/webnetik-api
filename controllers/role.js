const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const roleDAO = require('../db/daos/role');

router.post('/changeCapabilities', asyncHandler(async (request, response) => {
    const { roleId, capabilities } = request.body;

    try {
        const result = await roleDAO.changeRoleCapabilities(roleId, capabilities);

        response.status(200).json({ result });
    } catch (error) {
        response.status(403).send(error.message);
    }
}));

router.post('/create', asyncHandler(async (request, response) => {
    const { roleName } = request.body;

    try {
        const result = await roleDAO.createRole(roleName);

        response.status(200).json({ result });
    } catch (error) {
        response.status(403).send(error.message);
    }
}));

module.exports = router;