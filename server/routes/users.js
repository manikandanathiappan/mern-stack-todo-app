const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

router.post('/add', async (req, res) => {
  let { user_name, user_id, password } = req.body;
  let user = await User.findOne({ user_id });

  if(user) {
    return res.status(400).json({ message: "Already exists"})
  }

  password = await bcrypt.hash(password, 10);

  user = new User({ user_name, user_id, password });
  await user.save();

  return res.status(200).json({ message: "User added successfully!" })
});

module.exports = router;
