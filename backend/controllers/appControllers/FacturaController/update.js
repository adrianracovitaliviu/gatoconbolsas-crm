const mongoose = require('mongoose');

const Model = mongoose.model('Factura');

const custom = require('@/controllers/middlewaresControllers/pdfController');

const { calculate } = require('@/helpers');
const schema = require('./schemaValidate');

const update = async (req, res) => {
  try {
    let body = req.body;

    const { error, value } = schema.validate(body);
    if (error) {
      const { details } = error;
      return res.status(400).json({
        success: false,
        result: null,
        message: details[0]?.message,
      });
    }

    const { items = [], taxRate = 0, discount = 0, recargo = 0 } = req.body;

    // default
    let recargoTotal = 0;
    let subTotal = 0;
    let taxTotal = 0;
    let total = 0;
    let recargoValue = 0;
    let taxValue = 0;
    let currentTotal = 0;

    // Calculate the items array with subTotal, total, taxTotal
    items.map((item) => {
      let total = calculate.multiply(item['quantity'], item['price']);
      //sub total
      subTotal = calculate.add(subTotal, total);
      //item total
      item['total'] = total;
    });

    // Calculate taxValue based on subTotal and taxRate
    taxValue = calculate.multiply(subTotal, taxRate);

    // Calculate recargoValue based on subTotal and recargo (5.2%)
    recargoValue = calculate.multiply(subTotal, recargo / 1000);

    // Calculate currentTotal by adding subTotal and taxValue
    currentTotal = calculate.add(subTotal, taxValue);

    // Calculate total by adding currentTotal and recargoValue
    total = calculate.add(currentTotal, recargoValue).toFixed(2) / 1;

    body['subTotal'] = subTotal;
    body['taxTotal'] = taxValue;
    body['recargoTotal'] = recargoValue;
    body['total'] = total;
    body['items'] = items;
    body['pdfPath'] = 'factura-' + req.params.id + '.pdf';

    // Find document by id and update with the required fields
    const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, body, {
      new: true, // return the new result instead of the old one
    }).exec();

    // custom.generatePdf('Factura', { filename: 'Factura', format: 'A4' }, result);

    // Returning successful response
    return res.status(200).json({
      success: true,
      result,
      message: 'Se ha actualizado el documento con id: ' + req.params.id,
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        error: err,
        message: 'Faltan campos obligatorios.',
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        error: err,
        message: 'Oops ha habido un error',
      });
    }
  }
};

module.exports = update;
