const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./connection');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { Socket } = require('dgram');

const io = new Server(server);

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

db.connect((err) => {
  // if (err) throw error;

  console.log('Database Connnected');

  app.get('/', (req, res) => {
    const sql = `SELECT * FROM book`;

    db.query(sql, (err, fields) => {
      // if (err) throw error;

      const books = JSON.parse(JSON.stringify(fields));

      console.log(books);
      res.render('index', { books: books });
    });
  });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/addbook', (req, res) => {
  // const { name, nib, genre, author } = req.body;

  const sql = `INSERT INTO book(id, nib, name, genre, author) VALUES ('','${req.body.nib}','${req.body.name}','${req.body.genre}','${req.body.author}')`;

  db.query(sql, (err, fields) => {
    // if (err) throw err;

    if (fields?.affectedRows) {
      const data = {
        isSuccesss: fields.affectedRows,
        id: fields.insertId,
      };
      console.log(data);

      res.redirect('/');
    }
  });
});

app.get('/delete/:id', (req, res) => {
  const sql = `DELETE FROM book WHERE id = ${req.params.id}`;

  db.query(sql, (err, fields) => {
    // if (err) throw error;

    console.log(fields);
    res.redirect('/');
  });
});

app.post('/search', (req, res) => {
  // const { name, nib, genre, author } = req.body;

  const sql = `SELECT * FROM book WHERE id LIKE '%${req.body.search}%' OR nib LIKE '%${req.body.search}%' OR name LIKE '%${req.body.search}%' OR genre LIKE '%${req.body.search}%' OR author LIKE '%${req.body.search}%'`;

  db.query(sql, (err, fields) => {
    // if (err) throw err;

    const books = JSON.parse(JSON.stringify(fields));

    console.log(books);
    res.render('index', { books: books });
  });
});

app.get('/update/:id', (req, res) => {
  const sql = `SELECT * FROM book WHERE id = ${req.params.id}`;

  db.query(sql, (err, fields) => {
    const data = JSON.parse(JSON.stringify(fields));
    console.log(data);
    res.render('update', { data: data });
  });
});

app.post('/updatebook/:id', (req, res) => {
  // const { name, nib, genre, author } = req.body;

  const sql = `UPDATE book SET nib='${req.body.nib}',name='${req.body.name}',genre='${req.body.genre}',author='${req.body.author}' WHERE id = ${req.params.id}`;

  db.query(sql, (err, fields) => {
    // if (err) throw err;
    console.log(fields);
    res.redirect('/');
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/forum', (req, res) => {
  res.render('forum');
});

// socket IO server side
// server-side
io.on('connection', (socket) => {
  socket.on('join', (data) => {
    console.log(data);
    socket.broadcast.emit('join', data);
  });

  socket.on('message', (data, username) => {
    console.log(data);
    socket.broadcast.emit('message', data, username);
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
