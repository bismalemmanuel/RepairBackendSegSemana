const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const generateJWT = require('../utils/jwt');
// const { ref, uploadBytes } = require('firebase/storage');
// const { storage } = require('../utils/firebase');

/* A function that creates a user. */

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;

  // const imgRef = ref(storage, `users/${Date.now()}-${req.file.originalname}`);
  // const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const user = new User({
    name,
    email,
    password,
    role,
    // profileImageUrl: imgUploaded.metadata.fullPath,
  });

  // console.log(user);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/* A function that is used to login a user. */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
