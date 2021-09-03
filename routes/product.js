const express = require('express');
const router = express.Router();

const Product = require("../Models/Product");
const moment = require('moment');

router.get('/', async (req, res, next) => {
  try{
    const products = await Product.find({});
    res.render('product/index', {products, moment});
  }catch(err){
    next(err);
  }
});


module.exports = router;