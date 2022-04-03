const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  password: {
    type: 'string',
    required: true,
  },
});

module.exports = model('User', UserSchema);
