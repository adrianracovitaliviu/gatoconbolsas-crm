const mongoose = require('mongoose');

const Model = mongoose.model('Albaran');

const custom = require('@/controllers/middlewaresControllers/pdfController');

const { calculate } = require('@/helpers');

const update = async (req, res) => {
  try {
    const { items = [], taxRate = 0, discount = 0, recargo = 0, } = req.body;

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Faltan campos.',
      });
    }
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
    body['pdfPath'] = 'Albaran-' + req.params.id + '.pdf';
    // Find document by id and updates with the required fields

    const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, body, {
      new: true, // return the new result instead of the old one
    }).exec();

    // Returning successfull response

    custom.generatePdf('Albaran', { filename: 'Factura', format: 'A4' }, result);
    return res.status(200).json({
      success: true,
      result,
      message: 'Se ha actualizado el albarán: ' + req.params.id,
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    console.log(err);
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Faltan campos necesarios.',
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        message: 'Oops ha habido un error.',
      });
    }
  }
};
module.exports = update;
