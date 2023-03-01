const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findUser,
  updatePassword,
} = require('../controllers/users.controllers');
const {
  protectAccountOwner,
  protect,
  restrictTo,
} = require('../middlewares/auth.middleware');
const { validIfExistUser } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.use(protect);

router.get('/', findAllUsers);
router.get('/:id', validIfExistUser, findUser);
router.patch('/:id', validIfExistUser, protectAccountOwner, updateUser);
router.delete('/:id', validIfExistUser, protectAccountOwner, deleteUser);
router.patch(
  '/password/:id',
  [
    check('currentPassword', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'The new password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUser,
    protectAccountOwner,
    restrictTo('employee'),
  ],
  protectAccountOwner,
  updatePassword
);

module.exports = {
  usersRouter: router,
};
