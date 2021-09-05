const express = require('express');
const router = express.Router();

const Product = require("../Models/Product");
const moment = require('moment');

const { CLOUD_BASE_URL: cloudUrl, imgSetting } = require('../utils/config');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.render('product/index', { products, moment, cloudUrl, imgSetting, success: req.flash('success'), error: req.flash('error') });
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
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
});


module.exports = router;