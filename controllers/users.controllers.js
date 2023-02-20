const Repairs = require('../models/repairs.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: Repairs,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          where: {
            status: 'pending',
          },
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'The users found were successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role, status } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (user) {
    return res.status(404).json({
      status: 'error',
      message: 'user already exists',
    });
  }

  const newUser = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role: role.toLowerCase(),
    status,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user was created successfully',
    newUser,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { username, email } = req.body;
  const { user } = req;

  await user.update({ username, email });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});
