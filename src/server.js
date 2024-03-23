// node modules
const http = require('http');
const dotenv = require('dotenv').config();
const connectDb = require("./config/db/connectdb");

// custom modules
const app = require('./app');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// starting server
server.listen(PORT, async () => {
    await connectDb();
    console.log(`Server is running on port ${PORT}...`)
})

