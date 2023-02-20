const Repairs = require('../models/repairs.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = async (req, res) => {
  try {
    const repairs = await Repairs.findAll({
      where: {
        status: 'pending',
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'The repairs found were successfully',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

exports.findRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: 'The repair was found successfully',
    repair,
  });
});

exports.createRepair = async (req, res) => {
  try {
    const { date, status, userId } = req.body;

    const newRepair = await Repairs.create({
      date,
      userId,
    });

    res.status(201).json({
      status: 'success',
      message: 'The repair was created successfully',
      newRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    //1. OBTENGO MI ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { date, status, userId } = req.body;
    //3. BUSCAR LA REPARACION A ACTUALIZAR
    const repair = await Repairs.findOne({
      where: {
        id,
      },
    });
    //4. SI NO EXISTE LA REPARACION ENVIAMOS UN ERROR
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }
    //5. SI TODO SALIO BIEN, ACTUALIZAMOS LA REPARACION ENCONTRADO
    const updatedRepair = await repair.update({
      status: status.toLowerCase(),
    });
    //6. ENVIO LA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'Then repair has been updated successfully',
      updatedRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    //1. OBTENGO EL ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. BUSCAR LA REPARACION A ELIMINAR
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    //3. ENVIAR UN ERROR SI LA REPARACION NO SE ENCUENTRA
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair is not pending, it must be pending to be canceled',
      });
    }
    //4. ACTUALIZAR EL ESTADO DE LA REPARACION A FALSE
    await repair.update({ status: 'cancelled' });
    //await repair.destroy();

    //5. ENVIAR LA RESPUESTA AL CLIENTE

    res.status(200).json({
      status: 'success',
      message: 'The repair has been deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
