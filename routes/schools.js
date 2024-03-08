var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var SchoolService = require('../services/schoolService');
var db = require('../models');
var schoolService = new SchoolService(db);

router.get('/', async function (req, res, next) {
    let schools = await schoolService.getAll();
    res.send(schools);
});

router.get('/:id', async function (req, res, next) {
    const school = await schoolService.get(req.params.id);
    res.send(school);
});

router.post('/', jsonParser, async function (req, res, next) {
    let name = req.body.Name;
    let address = req.body.Address;
    let description = req.body.Description;
    await schoolService.create(name, address, description);
    res.end();
});

router.delete('/:id', jsonParser,async function (req, res, next) {
    await schoolService.delete(req.params.id);
    res.end();
});

module.exports = router;