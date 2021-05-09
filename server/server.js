const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dbSession = require('connect-mongodb-session')(session);

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 5000;

const url = "mongodb://localhost:27017/my_database";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const dbConnection = mongoose.connection;
dbConnection.once('open', () => {
  console.log('Database connected');
});

const store = new dbSession({ uri: url, collection: "sessions" });

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  store: store
}));

const isAuth = (req, res, next) => {
  if(req.session.isAuth) {
    next();
  } else {
    res.redirect('/sign-in')
  }
}

const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');

app.use('/users', usersRouter);
app.use('/todos', isAuth, todosRouter);

app.post('/login', async (req, res) => {
  const { user_id, password } = req.body;
  const user = await User.findOne({ user_id });

  if(!user) {
    return res.json({ status: 401, error: "Invalid Username or Password" });
  }

  if(await bcrypt.compare(password, user.password)) {
    return res.json({ status: 401, error: "Invalid Username or Password" });
  }

  req.session.isAuth = true;
  res.redirect('/dashboard');
});

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) throw error;
    res.redirect('/')
  })
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});
