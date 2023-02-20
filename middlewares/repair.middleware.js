const Repairs = require('../models/repairs.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* A middleware that checks if the productId is valid. */
exports.validRepairById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repairs.findOne({
    where: {
      id: id,
      status: 'pending',
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!repair) {
    return next(new AppError('Repairs not found', 404));
  }

  req.repair = repair;
  next();
});
