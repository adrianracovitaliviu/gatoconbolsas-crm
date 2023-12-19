const mongoose = require('mongoose');

const Model = mongoose.model('PaymentFactura');
const Factura = mongoose.model('Factura');
const custom = require('@/controllers/middlewaresControllers/pdfController');

const { calculate } = require('@/helpers');

const update = async (req, res) => {
  try {
    if (req.body.amount === 0) {
      return res.status(202).json({
        success: false,
        result: null,
        message: `The Minimum Amount couldn't be 0`,
      });
    }
    // Find document by id and updates with the required fields
    const previousPayment = await Model.findOne({
      _id: req.params.id,
      removed: false,
    });

    const { amount: previousAmount } = previousPayment;
    const { id: FacturaId, total, discount, credit: previousCredit } = previousPayment.Factura;

    const { amount: currentAmount } = req.body;

    const changedAmount = calculate.sub(currentAmount, previousAmount);
    const maxAmount = calculate.sub(total, calculate.add(discount, previousCredit));

    if (changedAmount > maxAmount) {
      return res.status(202).json({
        success: false,
        result: null,
        message: `The Max Amount you can add is ${maxAmount + previousAmount}`,
        error: `The Max Amount you can add is ${maxAmount + previousAmount}`,
      });
    }

    let paymentStatus =
      calculate.sub(total, discount) === calculate.add(previousCredit, changedAmount)
        ? 'pagado'
        : calculate.add(previousCredit, changedAmount) > 0
        ? 'parcial'
        : 'impago';

    const updatedDate = new Date();
    const updates = {
      number: req.body.number,
      date: req.body.date,
      amount: req.body.amount,
      paymentMode: req.body.paymentMode,
      ref: req.body.ref,
      description: req.body.description,
      updated: updatedDate,
    };

    const result = await Model.findOneAndUpdate(
      { _id: req.params.id, removed: false },
      { $set: updates },
      {
        new: true, // return the new result instead of the old one
      }
    ).exec();

    const updateFactura = await Factura.findOneAndUpdate(
      { _id: result.Factura._id.toString() },
      {
        $inc: { credit: changedAmount },
        $set: {
          paymentStatus: paymentStatus,
        },
      },
      {
        new: true, // return the new result instead of the old one
      }
    ).exec();

    await custom.generatePdf(
      'PaymentFactura',
      { filename: 'payment-Factura-report', format: 'A4' },
      updateFactura
    );

    res.status(200).json({
      success: true,
      result,
      message: 'Successfully updated the Payment ',
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

module.exports = update;
