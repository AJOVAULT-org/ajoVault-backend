// node or built-in modules
const express = require('express');

// custom modules
const exampleRoute = require('./routes/exampleRoute');
const registerRouter = require('./routes/registerRoute');

const app = express();

// whitelisting cors implementation - need details front client
// app.use(cors({
//     origin: '',
// }))

app.use(express.json());
app.use('/example', exampleRoute);
app.use('api/v1/', registerRouter);

module.exports = app;