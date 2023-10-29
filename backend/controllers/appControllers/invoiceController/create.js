const mongoose = require('mongoose');

const Model = mongoose.model('Invoice');

const custom = require('@/controllers/middlewaresControllers/pdfController');

const { calculate } = require('@/helpers');
const schema = require('./schemaValidate');

const create = async (req, res) => {
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

    const { items = [], taxRate = 0, discount = 0, recargo = 0 } = value;

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
    recargoValue = calculate.multiply(subTotal, 0.052);

    // Calculate currentTotal by adding subTotal and taxValue
    currentTotal = calculate.add(subTotal, taxValue);

    // Calculate total by adding currentTotal and recargoValue
    total = calculate.add(currentTotal, recargoValue).toFixed(2) / 1;

    body['subTotal'] = subTotal;
    body['taxTotal'] = taxValue; // Store taxValue as taxTotal
    body['taxValue'] = taxValue;
    body['currentTotal'] = currentTotal;
    body['recargoTotal'] = recargoValue; // Store recargoValue as recargoTotal
    body['recargoValue'] = recargoValue;
    body['total'] = total;
    body['items'] = items;

    let paymentStatus = calculate.sub(total, discount) === 0 ? 'pagado' : 'impago';

    body['paymentStatus'] = paymentStatus;
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

    // custom.generatePdf('Invoice', { filename: 'invoice', format: 'A4' }, result);

    // Returning successful response
    return res.status(200).json({
      success: true,
      result: updateResult,
      message: 'Factura creada con éxito.',
    });
  } catch (err) {
    console.log(err);
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        error: err,
        message: 'Faltan campos necesarios.',
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        error: err,
        message: 'Oops ha habido un error.',
      });
    }
  }
};

module.exports = create;