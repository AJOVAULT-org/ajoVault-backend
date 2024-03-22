// node modules
const http = require('http');
const dotenv = require('dotenv').config();

// custom modules
const app = require('./app');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// starting server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})

