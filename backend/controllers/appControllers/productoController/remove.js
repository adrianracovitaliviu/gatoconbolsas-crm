const mongoose = require('mongoose');

const Model = mongoose.model('Producto');
const AlbaranModel = mongoose.model('Albaran');
const FacturaModel = mongoose.model('Factura');

const remove = async (req, res) => {
  // cannot delete client it it have one Factura or Albarans:
  // check if client have Factura or Albarans:
  const { id } = req.params;
  try {
    // first find if there alt least one Albaran or Factura exist corresponding to the client
    const Albarans = await AlbaranModel.findOne({ client: id, removed: false }).exec();
    if (Albarans) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'No se puede eliminar al cliente si tiene facturas o albaranes pendientes.',
      });
    }
    const Factura = await FacturaModel.findOne({ client: id, removed: false }).exec();
    if (Factura) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'No se puede eliminar al cliente si tiene facturas o albaranes pendientes.',
      });
    }

    // if no Factura or Albaran, delete the client
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
