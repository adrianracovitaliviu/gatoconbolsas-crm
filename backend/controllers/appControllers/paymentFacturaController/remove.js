const mongoose = require('mongoose');

const Model = mongoose.model('PaymentFactura');
const Factura = mongoose.model('Factura');

const remove = async (req, res) => {
  try {
    // Find document by id and updates with the required fields
    const previousPayment = await Model.findOne({
      _id: req.params.id,
      removed: false,
    });

    if (!previousPayment) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No se encontraron documentos con el id: ' + req.params.id,
      });
    }

    const { _id: paymentFacturaId, amount: previousAmount } = previousPayment;
    const { id: FacturaId, total, discount, credit: previousCredit } = previousPayment.Factura;

    // Find the document by id and delete it
    let updates = {
      removed: true,
    };
    // Find the document by id and delete it
    const result = await Model.findOneAndUpdate(
      { _id: req.params.id, removed: false },
      { $set: updates },
      {
        new: true, // return the new result instead of the old one
      }
    ).exec();
    // If no results found, return document not found

    let paymentStatus =
      total - discount === previousCredit - previousAmount
        ? 'pagado'
        : previousCredit - previousAmount > 0
        ? 'parcial'
        : 'impago';

    const updateFactura = await Factura.findOneAndUpdate(
      { _id: FacturaId },
      {
        $pull: {
          paymentFactura: paymentFacturaId,
        },
        $inc: { credit: -previousAmount },
        $set: {
          paymentStatus: paymentStatus,
        },
      },
      {
        new: true, // return the new result instead of the old one
      }
    ).exec();

    return res.status(200).json({
      success: true,
      result,
      message: 'Eliminado el documento con id: ' + req.params.id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Oops ha habido un error',
      error: err,
    });
  }
};
module.exports = remove;
