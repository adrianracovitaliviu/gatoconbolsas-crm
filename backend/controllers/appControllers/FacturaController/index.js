const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Factura');

const sendMail = require('./mailFacturaController');
const create = require('./create');
const summary = require('./summary');
const update = require('./update');
const remove = require('./remove');

methods.sendMail = sendMail;
methods.create = create;
methods.update = update;
methods.delete = remove;
methods.summary = summary;

module.exports = methods;
