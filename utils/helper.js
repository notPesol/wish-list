const mongoose = require('mongoose');

const {MONGO_USERNAME, MONGO_PASSWORD, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = require('./config');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
});

const connectDatabase = () => {
  mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.dshvc.mongodb.net/wishList?retryWrites=true&w=majority`)
    .then(_ => {
      console.log('Database connected...');
    })
    .catch(err => {
      console.error(err);
    })
}

module.exports = {
  connectDatabase,
  cloudinary
}