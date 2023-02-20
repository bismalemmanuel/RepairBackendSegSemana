const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findUser,
} = require('../controllers/users.controllers');
const { validIfExistUser } = require('../middlewares/user.middleware');

const router = Router();

router.get('', findAllUsers);
router.get('/:id', validIfExistUser, findUser);

router.post(
  '/',
  [
    check('username', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
  ],
  createUser
);

router.patch('/:id', validIfExistUser, updateUser);
router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
