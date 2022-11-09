const express = require('express');
const cors = require('cors');
const db = require('./models/index');
const router = require('./router/user.router');
const session = require('express-session');

const PORT = 3001;
const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

const cookieSecret = 'SuperSecurePassword';
const sid = {
  name: 'sid',
  secret: cookieSecret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: false,
    secure: false
  }
};

app.use(session(sid));

app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('404 not found');
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server couldn't start. Error: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
    db();
  }
});