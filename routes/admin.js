const express = require('express');
const router = express.Router();

const {renderAdd, isAdmin, addProduct, deleteProduct} = require('../controllers/admin');

router.get('/add', renderAdd);

router.post('/add', isAdmin, addProduct);

router.post('/:productId', isAdmin, deleteProduct)

module.exports = router;