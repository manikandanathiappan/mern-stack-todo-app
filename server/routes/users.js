const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.post('/add', async (req, res) => {
  const { user_name, user_id, password } = req.body;
  const user = await User.findOne({ user_id });

  if(user) {
    return res.json({ status: 400, error: "Please enter different user id"})
  }

  const safePassword = await bcrypt.hash(password, 10);

  user = new User({ user_name, user_id, safePassword });
  await user.save();

  res.redirect('/sign-in')
});

module.exports = router;
