const express = require('express');
const router = express.Router();

const {renderLogin, login, renderRegister, register, renderWishlist, removeWishlist, logout} = require('../controllers/member');

router.get('/login', renderLogin);

router.post('/login', login);

router.get('/register', renderRegister);

router.post('/register', register);

router.get('/wishlist', renderWishlist);

router.post('/:productId', removeWishlist)

router.get('/logout', logout);

module.exports = router;