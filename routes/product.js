const express = require('express');
const router = express.Router();

const { index, detail, addToWishlist } = require('../controllers/product');

router.get('/', index);

router.get('/:productId', detail);

router.post('/:productId', addToWishlist);


module.exports = router;