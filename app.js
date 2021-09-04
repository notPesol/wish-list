const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const expressSession = require('express-session');
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'secretMustSecret',
  saveUninitialized: false,
  resave: true
}));

const flash = require('connect-flash');
app.use(flash());

const { connectDatabase, cloudinary } = require('./utils/helper');
connectDatabase();

// Router
const productRouter = require('./routes/product');
const memberRouter = require('./routes/member');
const adminRouter = require('./routes/admin');

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

app.use('/', productRouter);
app.use('/member', memberRouter);
app.use('/admin', adminRouter);

app.use((err, req, res, next) => {
  res.json(err);
  console.log(err);
});

app.listen(PORT, () => {
  console.log('App running on port:', PORT);
});