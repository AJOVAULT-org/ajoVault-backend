// node or built-in modules
const express = require('express');

// custom modules
const exampleRoute = require('./routes/exampleRoute');

const app = express();

app.use(express.json());
app.use('/example', exampleRoute);

module.exports = app;