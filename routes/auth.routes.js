const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login } = require('../controllers/auth.controller');
const { validIfExistUserEmail } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/signup',
  [
    // upload.single('profileImageUrl'),
    check('name', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUserEmail,
  ],
  createUser
);

router.post(
  '/login',
  [
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = {
  authRouter: router,
};
