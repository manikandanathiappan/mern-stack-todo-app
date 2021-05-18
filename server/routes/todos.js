const router = require('express').Router();
const Todo = require('../models/todo.model');

router.get('/', (req, res) => {
  Todo.find({ user_id: req.query.user_id })
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.get('/get/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.get('/done', (req, res) => {
  Todo.find({ user_id: req.query.user_id, is_active: false })
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

router.put('/update/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(task => {
      task.todos = req.body.todos;
      task.is_active = req.body.is_active;
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
