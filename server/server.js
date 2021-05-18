const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Todo = require('./models/todo.model');

const app = express();

app.use(cors());
app.use(express.json())

const port = 5000;

const url = process.env.MONGO_DB_URI || "mongodb://localhost:27017/my_database";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const dbConnection = mongoose.connection;
dbConnection.once('open', () => {
  console.log('Database connected');
});

app.post('/login', async (req, res) => {
  const { user_id, password } = req.body;
  const user = await User.findOne({ user_id });

  if(!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  if(!await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: "Invalid Username or Password" })
  }

  const token = jwt.sign({
    _id: user._id,
    user_name: user.user_name,
    user_id: user.user_id,
    updated_at: user.updated_at,
    created_at: user.created_at
  }, 'qwertyuiop!@#$%asdfghjkl^&*()zxcvbnm')

  res.status(200).json({
    message: "Login successful",
    token: token
  })
})

app.post('/todo/add', async (req, res) => {
  const { user_id, todos } = req.body;
  const todo = new Todo({ user_id, todos });
  todo.save()
    .then(() => res.status(200).json("Task added successfully"))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

app.post('/logout', (req, res) => {
  setTimeout(() => {
    res.status(200).json("Logged out successfully");
  }, 3000);
});

const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');

app.use('/users', usersRouter);
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});
