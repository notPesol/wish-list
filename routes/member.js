const express = require('express');
const router = express.Router();

const Member = require('../Models/Member');

const bcrypt = require('bcrypt');

router.get('/login', (req, res, next) => {
  res.render('member/login');
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const member = await Member.findOne({ email });
    if (member) {
      const isValid = bcrypt.compareSync(password, member.password);
      if (isValid) {
        req.session.user = member;
        return res.redirect('/');
      }

      // if not true
      res.redirect('/member/login');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/register', (req, res, next) => {
  res.render('member/register');
});

router.get('/logout', (req, res, next) => {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;