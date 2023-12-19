const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const productoSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  codigo: {
    type: String,
    trim: true,
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
  },
  familia: {
    type: String,
  },
});

module.exports = mongoose.model('Producto', productoSchema);
