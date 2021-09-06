const Product = require("../Models/Product");
const Wishlist = require('../Models/Wishlist');

const moment = require('moment');

const { CLOUD_BASE_URL: cloudUrl, imgSetting } = require('../utils/config');

module.exports.index = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.render('product/index', { products, moment, cloudUrl, imgSetting, success: req.flash('success'), error: req.flash('error') });
  } catch (err) {
    next(err);
  }
}

module.exports.detail = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      req.flash('error', 'No product from params');
      return res.redirect('/');
    }
    res.render('product/detail', { product, moment, cloudUrl, imgSetting, success: req.flash('success'), error: req.flash('error') })
  } catch (error) {
    next(error);
  }
}

module.exports.addToWishlist = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user) return res.redirect('/');

    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: user._id });
    // if user not have wishlist
    if (!wishlist) {
      const newWishlist = new Wishlist({ user: user._id, products: [productId] });
      await newWishlist.save();
    }

    const isHad = wishlist.products.some(product => product == productId);
    if (!isHad) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    req.flash('success', 'add to wish list success...');
    return res.redirect(`/${productId}`);

  } catch (error) {
    next(error);
  }
}