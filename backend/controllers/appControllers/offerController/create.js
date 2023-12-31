const mongoose = require('mongoose');

const Model = mongoose.model('Offer');

const custom = require('@/controllers/middlewaresControllers/pdfController');

const { calculate } = require('@/helpers');

const create = async (req, res) => {
  try {
    const { items = [], taxRate = 0, discount = 0, recargo = 0, } = req.body;

    // default
    let recargoTotal = 0;
    let subTotal = 0;
    let taxTotal = 0;
    let total = 0;
    // let credit = 0;

    //Calculate the items array with subTotal, total, taxTotal
    items.map((item) => {
      let total = calculate.multiply(item['quantity'], item['price']);
      //sub total
      subTotal = calculate.add(subTotal, total);
      //item total
      item['total'] = total;
    });
    taxTotal = calculate.multiply(subTotal, taxRate);
    total = calculate.add(subTotal, taxTotal);
    recargoTotal = calculate.add(subTotal, recargo);

    let body = req.body;

    body['subTotal'] = subTotal;
    body['taxTotal'] = taxTotal;
    body['total'] = total;
    body['items'] = items;

    // Creating a new document in the collection
    const result = await new Model(body).save();
    const fileId = 'factura-' + result._id + '.pdf';
    const updateResult = await Model.findOneAndUpdate(
      { _id: result._id },
      { pdfPath: fileId },
      {
        new: true,
      }
    ).exec();
    // Returning successfull response

    custom.generatePdf('Offer', { filename: 'Albaran', format: 'A4' }, result);

    // Returning successfull response
    return res.status(200).json({
      success: true,
      result: updateResult,
      message: 'Albaran fue creado con éxito',
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Faltan campos obligatorios',
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        message: 'Oops ha habido un error',
      });
    }
  }
};
module.exports = create;
