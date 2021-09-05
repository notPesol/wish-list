const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Member"
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: "Product"
  }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);