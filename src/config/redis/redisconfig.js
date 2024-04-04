const redis = require("redis");
require("dotenv").config();

// const connectRedis

const redisClient = redis
  .createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }}).on("error", (err) => console.log(err.message));

    redisClient
      .connect()
      .then(() => console.log("Redis client connected"))
      .catch((err) => console.error("Error connecting to Redis:", err));

module.exports = redisClient;

