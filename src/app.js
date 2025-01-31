// node or built-in modules
const express = require('express');

// custom modules
const exampleRoute = require('./routes/exampleRoute');

const app = express();

// whitelisting cors implementation - need details front client
// app.use(cors({
//     origin: '',
// }))

app.use(express.json());
app.use('/example', exampleRoute);

module.exports = app;