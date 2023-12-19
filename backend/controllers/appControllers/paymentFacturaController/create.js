const mongoose = require('mongoose');

const Model = mongoose.model('PaymentFactura');
const Factura = mongoose.model('Factura');
const custom = require('@/controllers/middlewaresControllers/pdfController');

const { calculate } = require('@/helpers');

const create = async (req, res) => {
  try {
    // Creating a new document in the collection
    if (req.body.amount === 0) {
      return res.status(202).json({
        success: false,
        result: null,
        message: `The Minimum Amount couldn't be 0`,
      });
    }

    const currentFactura = await Factura.findOne({
      _id: req.body.Factura,
      removed: false,
    });

    const {
      total: previousTotal,
      discount: previousDiscount,
      credit: previousCredit,
    } = currentFactura;

    const maxAmount = calculate.sub(calculate.sub(previousTotal, previousDiscount), previousCredit);

    if (req.body.amount > maxAmount) {
      return res.status(202).json({
        success: false,
        result: null,
        message: `The Max Amount you can add is ${maxAmount}`,
      });
    }

    const result = await Model.create(req.body);

    const fileId = 'payment-Factura-report-' + result._id + '.pdf';
    const updatePath = await Model.findOneAndUpdate(
      { _id: result._id.toString(), removed: false },
      { pdfPath: fileId },
      {
        new: true,
      }
    ).exec();
    // Returning successfull response

    const { _id: paymentFacturaId, amount } = result;
    const { id: FacturaId, total, discount, credit } = currentFactura;

    let paymentStatus =
      calculate.sub(total, discount) === calculate.add(credit, amount)
        ? 'pagado'
        : calculate.add(credit, amount) > 0
        ? 'parcial'
        : 'impago';

    const FacturaUpdate = await Factura.findOneAndUpdate(
      { _id: req.body.Factura },
      {
        $push: { paymentFactura: paymentFacturaId.toString() },
        $inc: { credit: amount },
        $set: { paymentStatus: paymentStatus },
      },
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      }
    ).exec();

    await custom.generatePdf(
      'PaymentFactura',
      { filename: 'payment-Factura-report', format: 'A4' },
      FacturaUpdate
    );

    res.status(200).json({
      success: true,
      result: updatePath,
      message: 'Pago registrado con éxito',
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      res.status(400).json({
        success: false,
        result: null,
        message: 'Faltan campos obligatorios',
        error: err,
      });
    } else {
      // Server Error
      res.status(500).json({
        success: false,
        result: null,
        message: 'Oops ha habido un error',
        error: err,
      });
    }
  }
};

module.exports = create;
