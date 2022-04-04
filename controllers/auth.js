const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists',
      });
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Please communicate with the admin.',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email or password are incorrect',
      });
    }

    // Confirm passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Email or password are incorrect',
      });
    }

    // Generate Token
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Please communicate with the admin.',
    });
  }
};

const renewToken = async (req, res) => {
  const { uid, name } = req;

  // Generate new JWT and return it in this request
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
    uid,
    name,
  });
};

module.exports = { createUser, loginUser, renewToken };
