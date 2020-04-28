const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const courseDAO = require('../db/daos/course');

router.get('/all', asyncHandler(async (request, response) => {
    const courses = await courseDAO.getAll();
    response.status(200).json({ "courses": courses });
}));

router.post('/add', asyncHandler(async (request, response) => {
    const { title, description } = request.body;
    const course = await courseDAO.create(title, description);

    response.status(200).json({ course });
}));

router.post('/delete', asyncHandler(async (request, response) => {
    const { id } = request.body;
    const course = await courseDAO.deleteCourse(id);

    response.status(200).json({ "courseId": course });
}));

router.post('/modify', asyncHandler(async (request, response) => {
    const { course } = request.body;

    const modifiedCourse = await courseDAO.modifyCourse(course);

    response.status(200).json({ "modifiedCourse": modifiedCourse });
}));


module.exports = router;
