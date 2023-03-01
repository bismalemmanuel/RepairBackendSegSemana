const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
  findRepair,
} = require('../controllers/repairs.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { validRepairById } = require('../middlewares/repair.middleware');

const router = Router();

router.use(protect);

router.get('/', restrictTo('admin'), findAllRepairs);
router.get('/:id', validRepairById, restrictTo('admin'), findRepair);
router.post(
  '',
  check(
    'status',
    'It must be one of these three options: pending, completed, cancelled'
  ).isIn(['pending', 'completed', 'cancelled']),
  check('status', 'The status must be mandatory').not().isEmpty(),
  check('userId', 'The producId must be a number').isNumeric(),
  check('userId', 'The status must be mandatory').not().isEmpty(),
  restrictTo('admin'),
  createRepair
);
router.patch('/:id', restrictTo('admin'), updateRepair);
router.delete('/:id', restrictTo('admin'), deleteRepair);

module.exports = {
  repairsRouter: router,
};
