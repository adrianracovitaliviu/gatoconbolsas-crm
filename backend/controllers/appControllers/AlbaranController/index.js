const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Albaran');

const sendMail = require('./mailAlbaranController');
const create = require('./create');
const summary = require('./summary');
const update = require('./update');
const convertAlbaranToFactura = require('./convertAlbaranToFactura');

methods.sendMail = sendMail;
methods.create = create;
methods.update = update;
methods.convertAlbaranToFactura = convertAlbaranToFactura;
methods.summary = summary;

module.exports = methods;
