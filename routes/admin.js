const express = require('express');
const router = express.Router();

const formidable = require('formidable');

const { cloudinary, isFileValid } = require('../utils/helper');

const os = require('os');
const fs = require('fs');
const path = require('path');

const Product = require('../Models/Product');

router.get('/add', (req, res) => {
  const user = res.locals.user;
  if (user) {
    if (user.superUser) {
      return res.render('admin/add', { success: req.flash('success'), error: req.flash('error') });
    } else {
      return res.redirect('/');
    }
  }
  res.redirect('/');
})

router.post('/add', (req, res, next) => {
  const user = res.locals.user;
  if (user) {
    if (user.superUser) {
      return next();
    }
    return res.redirect('/');
  }
}, async (req, res, next) => {
  const form = formidable({
    maxFileSize: 10 * 1024 * 1024,
    multiples: true
  })
  form.parse(req, async (err, fields, files) => {
    if (err) return next(err);
    try {
      const images = files.images;
      const product = new Product({
        ...fields
      });
      console.log(product);
      for (const img of images) {
        const isValid = isFileValid(img);
        if (!isValid) continue;

        // create a file name
        const fileName = encodeURIComponent(img.name.replace(/\s/g, "-"));
        const oldName = img.path;
        const newName = path.join(os.tmpdir(), fileName);

        fs.renameSync(oldName, newName);
        const imgUrl = await cloudinary.uploader.upload(newName, {
          folder: "wishlist",
          unique_filename: true,
          use_filename: true
        });
        product.images.push(imgUrl.public_id);
      }
      await product.save();
      req.flash('success', 'Add product successfully...');
      res.redirect('/admin/add');
    } catch (error) {
      next(error);
    }
  });
});



module.exports = router;