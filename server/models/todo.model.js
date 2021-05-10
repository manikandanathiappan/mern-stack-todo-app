const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    user_id: { type: String, required: true },
    todos: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
