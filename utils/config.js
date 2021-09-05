require('dotenv').config();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
const CLOUD_BASE_URL = process.env.CLOUD_BASE_URL;

const imgSetting = 'c_fill,w_500,h_500';


module.exports = {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_BASE_URL,
  imgSetting
}