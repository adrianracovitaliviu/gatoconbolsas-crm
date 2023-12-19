const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('Albaran');
const FacturaModel = mongoose.model('Factura');

const convertAlbaranToFactura = async (req, res) => {
  try {
    const AlbaranId = req.params.id; // Assuming the Albaran ID is passed in the URL

    // Fetch the Albaran from the database
    const Albaran = await Model.findById(AlbaranId);
    if (!Albaran) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Albarán no encontrado.',
      });
    }

    // If the Albaran is already converted, prevent creating another Factura
    if (Albaran.converted) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'Albarán ya convertido a factura.',
      });
    }

    // Convert the Albaran details to Factura details
    const FacturaData = {
      number: Albaran.number,
      year: Albaran.year,
      date: moment(),
      expiredDate: moment().add(1, 'month'),
      client: Albaran.client,
      items: Albaran.items.map((item) => ({
        itemName: item.itemName,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),
      taxRate: Albaran.taxRate,
      subTotal: Albaran.subTotal,
      taxTotal: Albaran.taxTotal,
      recargo: Albaran.recargo,
      recargoTotal: Albaran.recargoTotal,
      total: Albaran.total,
      credit: Albaran.credit,
      discount: Albaran.discount,
      note: Albaran.note,
    };

    // Create the Factura document
    const Factura = await new FacturaModel(FacturaData).save();

    // Mark the Albaran as converted
    Albaran.converted = true;
    await Albaran.save();

    // Return the created Factura
    return res.status(200).json({
      success: true,
      result: Albaran,
      message: 'Convertido a factura con éxito.',
    });
  } catch (err) {
    // If error is because of Invalid ObjectId
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'ID no válido.',
      });
    } else {
      return res.status(500).json({
        success: false,
        result: null,
        message: 'Oops ha habido un error.',
      });
    }
  }
};

module.exports = convertAlbaranToFactura;
