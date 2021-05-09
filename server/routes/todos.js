const router = require('express').Router();
const Todo = require('../models/todo.model');

router.post('/add', async (req, res) => {
  const { username, task } = req.body;

  const todo = new Todo(username, task);
  todo.save()
    .then(() => res.json('Task added successfully'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;
