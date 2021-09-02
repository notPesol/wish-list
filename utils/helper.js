const mongoose = require('mongoose');
const {MONGO_USERNAME, MONGO_PASSWORD} = require('./config')

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
  connectDatabase
}