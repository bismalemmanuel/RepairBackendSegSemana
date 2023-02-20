const Repairs = require('./repairs.model');
const User = require('./user.model');

const initModel = () => {
  /* 1User <--------> M Repair */
  User.hasMany(Repairs);
  Repairs.belongsTo(User);
};

module.exports = initModel;
