const router = require('express').Router();
const Todo = require('../models/todo.model');

router.get('/', (req, res) => {
  Todo.find({ user_id: req.query.user_id })
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post('/add', (req, res) => {
  const { username, task } = req.body;

  const todo = new Todo(username, task);
  todo.save()
    .then(() => res.json('Task added successfully'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post('/update/:id', (req, res) => {
  Todo.findById(req.query.id)
    .then(task => {
      task.todos = req.body.todos;
      task.save()
        .then(() => res.json("Task updated succesfully!"))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
})

router.delete('/:id', (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted successfully'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;
