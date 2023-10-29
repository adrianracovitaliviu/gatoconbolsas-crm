const mongoose = require('mongoose');

const Model = mongoose.model('Invoice');
const ModalPaymentInvoice = mongoose.model('PaymentInvoice');

const remove = async (req, res) => {
  try {
    const deletedInvoice = await Model.findOneAndUpdate(
      {
        _id: req.params.id,
        removed: false,
      },
      {
        $set: {
          removed: true,
        },
      }
    ).exec();

    if (!deletedInvoice) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No se ha encontrado la factura.',
      });
    }
    const paymentsInvoices = await ModalPaymentInvoice.updateMany(
      { invoice: deletedInvoice._id },
      { $set: { removed: true } }
    );
    return res.status(200).json({
      success: true,
      result: deletedInvoice,
      message: 'Invoice eliminada con éxito.',
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
