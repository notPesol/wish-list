const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member"
  },
  product: {
    type: [Schema.Types.ObjectId],
    ref: "Product"
  }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);