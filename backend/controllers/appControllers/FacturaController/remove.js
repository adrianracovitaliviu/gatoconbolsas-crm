const mongoose = require('mongoose');

const Model = mongoose.model('Factura');
const ModalPaymentFactura = mongoose.model('PaymentFactura');

const remove = async (req, res) => {
  try {
    const deletedFactura = await Model.findOneAndUpdate(
      {
        number: req.params.number,
        removed: false,
      },
      {
        $set: {
          removed: true,
        },
      }
    ).exec();

    if (!deletedFactura) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No se ha encontrado la factura.',
      });
    }


    const paymentsFacturas = await ModalPaymentFactura.updateMany(
      { Factura: deletedFactura._id },
      { $set: { removed: true } }
    );
    return res.status(200).json({
      success: true,
      result: deletedFactura,
      message: 'Factura eliminada con éxito.',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      error: err,
      message: 'Oops ha habido un error.',
    });
  }
};

module.exports = remove;