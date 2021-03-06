const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  detail: String,
  images: [String],
  remain: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);