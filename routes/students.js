var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var StudentService = require('../services/studentService');
var db = require('../models');
var studentService = new StudentService(db);

router.get('/', async (req, res, next) => {
    let students = await studentService.getAll();
    res.send(students);
});

router.get('/:id', async (req, res, next) => {
    const student = await studentService.get(req.params.id);
    res.send(student);
});

router.post('/', jsonParser, async (req, res, next) => {
    let firstName = req.body.FirstName;
    let lasttName = req.body.LastName;
    let schoolId = req.body.SchoolId;
    await studentService.create(firstName, lasttName, schoolId);
    res.end();
});

router.delete('/:id', jsonParser, async (req, res, next) => {
    await studentService.delete(req.params.id);
    res.end();
});

module.exports = router;