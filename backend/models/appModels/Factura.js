const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const FacturaSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  number: {
    type: Number,
    default: 1,
    required: false,
  },
  year: {
    type: Number,
    required: true,
  },
  recurring: {
    type: String,
    default: '0',
  },
  date: {
    type: Date,
    required: true,
  },
  expiredDate: {
    type: Date,
    required: true,
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
    autopopulate: true,
  },
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  taxRate: {
    type: Number,
    default: 0,
  },
  recargo: {
    type: Number,
    default: 0,
  },
  recargoTotal: {
    type: Number,
    default: 0,
  },
  recargoValue: {
    type: Number,
    default: 0,
  },
  subTotal: {
    type: Number,
    default: 0,
  },
  taxTotal: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  paymentFactura: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'PaymentFactura',
    },
  ],
  paymentStatus: {
    type: String,
    default: 'impago',
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    default: 'borrador',
  },
  pdfPath: {
    type: String,
    default: '',
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

FacturaSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Factura', FacturaSchema);
