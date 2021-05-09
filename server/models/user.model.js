const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user_name: { type: String, required: true, trim: true, minLength: 6 },
    user_id: { type: String, required: true, unique: true, trim: true, minLength: 3 },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
