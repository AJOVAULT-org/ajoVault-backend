/* eslint-disable no-console */
const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(`Error connecting to db, err: ${error.message}`);
  }
};

module.exports = connectDb;