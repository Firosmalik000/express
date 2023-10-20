const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;
// gunakan ejs
app.set('view engine', 'ejs');
//
// pake morgan
const morgan = require('morgan');

//
//
// thirdparty middleware
// 1. panggil express ejs layout
app.use(expressLayouts);
//
// 2. morgan
// tampil di terminal
app.use(morgan('dev'));
//
//
// built-in middleware static(untuk menyimpan file yang bisa diakses publik)
app.use(express.static('public'));
// panggil middleware(application level middleware)
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  // harus tulis next agar tidak hanging
  // next seperti res.end
  next();
});
app.use((req, res, next) => {
  console.log('ini middleware ke-2');
  next();
});

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'firos',
      email: 'firos@gmail.com',
    },
    {
      nama: 'rondy',
      email: 'rondy@gmail.com',
    },
    {
      nama: 'nauval',
      email: 'marsha@gmail.com',
    },
  ];

  res.render('index', {
    layout: 'layouts/main-layout',
    nama: 'firos',
    title: 'belajar EJS',
    mahasiswa,
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'About',
  });
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Contact',
  });
});
app.get('/data', (req, res) => {
  res.json({
    nama: 'firos',
    email: 'firos@gmail.com',
    noHp: '081234567890',
  });
});
app.get('/file', (req, res) => {
  res.sendFile('<h1>welcome to check</h1>');
});

app.get('/product/:id', (req, res) => {
  res.send(`product ID : ${req.params.id} <br> category : ${req.query.category}`);
});

app.use((req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
