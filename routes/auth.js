/* 
    User's Routes / Auth
    host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const router = express.Router();

router.post(
  '/new',
  [
    check('name', 'Your name is needed').not().isEmpty(),
    check('email', 'Your email is needed').isEmail(),
    check('password', 'Your password should have 6 characters').isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'Your email is needed').isEmail(),
    check('password', 'Your password should have 6 characters').isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
