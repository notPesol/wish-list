require('dotenv').config();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

module.exports = {
  MONGO_USERNAME,
  MONGO_PASSWORD
}