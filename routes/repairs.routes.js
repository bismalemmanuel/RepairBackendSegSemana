const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
  findRepair,
} = require('../controllers/repairs.controllers');
const { validRepairById } = require('../middlewares/repair.middleware');

const router = Router();

router.get('', findAllRepairs);
router.get('/:id', validRepairById, findRepair);
router.post(
  '',
  check(
    'status',
    'It must be one of these three options: pending, completed, cancelled'
  ).isIn(['pending', 'completed', 'cancelled']),
  check('status', 'The status must be mandatory').not().isEmpty(),
  check('userId', 'The producId must be a number').isNumeric(),
  check('userId', 'The status must be mandatory').not().isEmpty(),
  createRepair
);
router.patch('/:id', updateRepair);
router.delete('/:id', deleteRepair);

module.exports = {
  repairsRouter: router,
};
