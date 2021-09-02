const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const { connectDatabase } = require('./utils/helper');

connectDatabase();

app.listen(PORT, () => {
  console.log('App running on port:', PORT);
});