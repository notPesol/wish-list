const Member = require('../Models/Member');
const Wishlist = require('../Models/Wishlist');

const moment = require('moment');

const { CLOUD_BASE_URL: cloudUrl, imgSetting } = require('../utils/config');

const bcrypt = require('bcrypt');

module.exports.renderLogin = (req, res) => {
  res.render('member/login', { success: req.flash('success'), error: req.flash('error') });
}

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const member = await Member.findOne({ email });
    if (member) {
      const isValid = bcrypt.compareSync(password, member.password);
      if (isValid) {
        req.session.user = member;
        req.flash('success', 'You are logged in');
        return res.redirect('/');
      }

      // if not true
      res.redirect('/member/login');
    }
    req.flash('error', 'Email or Password not true');
    res.redirect('/member/login');
  } catch (error) {
    next(error);
  }
}

module.exports.renderRegister = (req, res, next) => {
  res.render('member/register', { success: req.flash('success'), error: req.flash('error') });
}

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const member = new Member({ email, password: hashPassword, firstName, lastName });
    await member.save();
    req.flash('success', 'Register successfully');
    res.redirect('/member/login');
  } catch (error) {
    if (error.name === 'MongoServerError') {
      req.flash('error', 'Email exist...')
      return res.redirect('/member/register');
    }
    next(error);
  }
}

module.exports.renderWishlist = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user) return res.redirect('/');

    const wishlist = await Wishlist.findOne({ user: user._id }).populate('products');
    res.render('member/wishlist', { wishlist, moment, cloudUrl, imgSetting, success: req.flash('success'), error: req.flash('error') });
  } catch (error) {
    next(error)
  }
}

module.exports.removeWishlist = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user) return res.redirect('/');

    const { productId } = req.params;
    let wishlist = await Wishlist.findOne({ user: user._id });

    wishlist.products = wishlist.products.filter(product => product != productId);
    await wishlist.save();
    req.flash('success', 'some product removed from your wishlist');
    res.redirect('/member/wishlist');
  } catch (error) {
    next(error);
  }
}

module.exports.logout = (req, res, next) => {
  delete req.session.user;
  req.flash('success', 'You are logged out')
  res.redirect('/');
}