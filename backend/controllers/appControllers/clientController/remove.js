const mongoose = require('mongoose');

const Model = mongoose.model('Client');
const QuoteModel = mongoose.model('Quote');
const InvoiceModel = mongoose.model('Invoice');

const remove = async (req, res) => {
  // cannot delete client it it have one invoice or quotes:
  // check if client have invoice or quotes:
  const { id } = req.params;
  try {
    // first find if there alt least one quote or invoice exist corresponding to the client
    const quotes = await QuoteModel.findOne({ client: id, removed: false }).exec();
    if (quotes) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'No se puede eliminar al cliente si tiene facturas o albaranes pendientes.',
      });
    }
    const invoice = await InvoiceModel.findOne({ client: id, removed: false }).exec();
    if (invoice) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'No se puede eliminar al cliente si tiene facturas o albaranes pendientes.',
      });
    }

    // if no invoice or quote, delete the client
    const result = await Model.findOneAndUpdate(
      { _id: id, removed: false },
      {
        $set: {
          removed: true,
        },
      }
    ).exec();
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No se encontraron clientes con el id: ' + id,
      });
    }
    return res.status(200).json({
      success: true,
      result,
      message: 'Eliminado cliente con el id: ' + id,
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
