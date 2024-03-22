const express = require('express');

// custom module
const httpExampleRequest = require('../controllers/exampleController');

const exampleRoute = express.Router();

exampleRoute.get('/', httpExampleRequest)

module.exports = exampleRoute;