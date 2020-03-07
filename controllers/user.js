const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const userDAO = require('../db/daos/user');

router.get('/users', asyncHandler(async (request, response) => {
    const users = await userDAO.getAllUsers();

    response.status(200).json({ "users": users });
}));

module.exports = router;