const express = require('express');

const { catchErrors } = require('@/handlers/errorHandlers');

const router = express.Router();

const employeeController = require('@/controllers/appControllers/employeeController');
const paymentModeController = require('@/controllers/appControllers/paymentModeController');
const clientController = require('@/controllers/appControllers/clientController');
const productoController = require('@/controllers/appControllers/productoController');
const leadController = require('@/controllers/appControllers/leadController');
const FacturaController = require('@/controllers/appControllers/FacturaController');
const itemController = require('@/controllers/appControllers/itemController');
const AlbaranController = require('@/controllers/appControllers/AlbaranController');
const supplierController = require('@/controllers/appControllers/supplierController');
const supplierOrderController = require('@/controllers/appControllers/supplierOrderController');
const expenseController = require('@/controllers/appControllers/expenseController');
const expenseCategoryController = require('@/controllers/appControllers/expenseCategoryController');
const paymentFacturaController = require('@/controllers/appControllers/paymentFacturaController');

const offerController = require('@/controllers/appControllers/offerController');

// //_________________________________ API for employees_____________________
router.route('/employee/create').post(catchErrors(employeeController.create));
router.route('/employee/read/:id').get(catchErrors(employeeController.read));
router.route('/employee/update/:id').patch(catchErrors(employeeController.update));
router.route('/employee/delete/:id').delete(catchErrors(employeeController.delete));
router.route('/employee/search').get(catchErrors(employeeController.search));
router.route('/employee/list').get(catchErrors(employeeController.list));
router.route('/employee/filter').get(catchErrors(employeeController.filter));

// //_____________________________________ API for payment mode_____________________
router.route('/paymentMode/create').post(catchErrors(paymentModeController.create));
router.route('/paymentMode/read/:id').get(catchErrors(paymentModeController.read));
router.route('/paymentMode/update/:id').patch(catchErrors(paymentModeController.update));
router.route('/paymentMode/delete/:id').delete(catchErrors(paymentModeController.delete));
router.route('/paymentMode/search').get(catchErrors(paymentModeController.search));
router.route('/paymentMode/list').get(catchErrors(paymentModeController.list));
router.route('/paymentMode/filter').get(catchErrors(paymentModeController.filter));

// //_____________________________________ API for clients __________________________________________________
router.route('/client/create').post(catchErrors(clientController.create));
router.route('/client/read/:id').get(catchErrors(clientController.read));
router.route('/client/update/:id').patch(catchErrors(clientController.update));
router.route('/client/delete/:id').delete(catchErrors(clientController.delete));
router.route('/client/search').get(catchErrors(clientController.search));
router.route('/client/list').get(catchErrors(clientController.list));
router.route('/client/filter').get(catchErrors(clientController.filter));
router.route('/client/summary').get(catchErrors(clientController.summary));

// //_____________________________________ API for productos __________________________________________________
router.route('/producto/create').post(catchErrors(productoController.create));
router.route('/producto/read/:id').get(catchErrors(productoController.read));
router.route('/producto/update/:id').patch(catchErrors(productoController.update));
router.route('/producto/delete/:id').delete(catchErrors(productoController.delete));
router.route('/producto/search').get(catchErrors(productoController.search));
router.route('/producto/list').get(catchErrors(productoController.list));
router.route('/producto/filter').get(catchErrors(productoController.filter));
router.route('/producto/summary').get(catchErrors(productoController.summary));
router.route('/producto/read/:codigo').get(catchErrors(async (req, res) => {
    const { codigo } = req.params;
  
    try {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
  
      const database = client.db(crm-gatoconbolsas);
      const productosCollection = database.collection('productos'); // Replace 'products' with your actual collection name
  
      const product = await productosCollection.findOne({ codigo });
  
      if (producto) {
        res.json({
          precioOptions: [producto.precio],
          descripcionOptions: [producto.descripcion],
        });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product from MongoDB:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.close();
    }
  }));


// //_____________________________________ API for leads __________________________________________________
router.route('/lead/create').post(catchErrors(leadController.create));
router.route('/lead/read/:id').get(catchErrors(leadController.read));
router.route('/lead/update/:id').patch(catchErrors(leadController.update));
router.route('/lead/delete/:id').delete(catchErrors(leadController.delete));
router.route('/lead/search').get(catchErrors(leadController.search));
router.route('/lead/list').get(catchErrors(leadController.list));
router.route('/lead/filter').get(catchErrors(leadController.filter));
router.route('/lead/summary').get(catchErrors(leadController.summary));

// //_________________________________________________________________API for Facturas_____________________
router.route('/Factura/create').post(catchErrors(FacturaController.create));
router.route('/Factura/read/:id').get(catchErrors(FacturaController.read));
router.route('/Factura/update/:id').patch(catchErrors(FacturaController.update));
router.route('/Factura/delete/:id').delete(catchErrors(FacturaController.delete));
router.route('/Factura/search').get(catchErrors(FacturaController.search));
router.route('/Factura/list').get(catchErrors(FacturaController.list));
router.route('/Factura/filter').get(catchErrors(FacturaController.filter));
router.route('/Factura/pdf/:id').get(catchErrors(FacturaController.generatePDF));
router.route('/Factura/summary').get(catchErrors(FacturaController.summary));
router.route('/Factura/mail').post(catchErrors(FacturaController.sendMail));

// //_________________________________________________________________API for items_____________________
router.route('/item/create').post(catchErrors(itemController.create));
router.route('/item/read/:id').get(catchErrors(itemController.read));
router.route('/item/update/:id').patch(catchErrors(itemController.update));
router.route('/item/delete/:id').delete(catchErrors(itemController.delete));
router.route('/item/search').get(catchErrors(itemController.search));
router.route('/item/list').get(catchErrors(itemController.list));
router.route('/item/filter').get(catchErrors(itemController.filter));

// //_________________________________________________________________API for Albarans_____________________

router.route('/Albaran/create').post(catchErrors(AlbaranController.create));
router.route('/Albaran/read/:id').get(catchErrors(AlbaranController.read));
router.route('/Albaran/update/:id').patch(catchErrors(AlbaranController.update));
router.route('/Albaran/delete/:id').delete(catchErrors(AlbaranController.delete));
router.route('/Albaran/search').get(catchErrors(AlbaranController.search));
router.route('/Albaran/list').get(catchErrors(AlbaranController.list));
router.route('/Albaran/filter').get(catchErrors(AlbaranController.filter));
router.route('/Albaran/pdf/:id').get(catchErrors(AlbaranController.generatePDF));
router.route('/Albaran/summary').get(catchErrors(AlbaranController.summary));
router.route('/Albaran/convert/:id').get(catchErrors(AlbaranController.convertAlbaranToFactura));
router.route('/Albaran/mail').post(catchErrors(AlbaranController.sendMail));

// //___________________________________________ API for suppliers _____________________
router.route('/supplier/create').post(catchErrors(supplierController.create));
router.route('/supplier/read/:id').get(catchErrors(supplierController.read));
router.route('/supplier/update/:id').patch(catchErrors(supplierController.update));
router.route('/supplier/delete/:id').delete(catchErrors(supplierController.delete));
router.route('/supplier/search').get(catchErrors(supplierController.search));
router.route('/supplier/list').get(catchErrors(supplierController.list));
router.route('/supplier/filter').get(catchErrors(supplierController.filter));

// //___________________________________________ API for suppliers _____________________
router.route('/supplierOrder/create').post(catchErrors(supplierOrderController.create));
router.route('/supplierOrder/read/:id').get(catchErrors(supplierOrderController.read));
router.route('/supplierOrder/update/:id').patch(catchErrors(supplierOrderController.update));
router.route('/supplierOrder/delete/:id').delete(catchErrors(supplierOrderController.delete));
router.route('/supplierOrder/search').get(catchErrors(supplierOrderController.search));
router.route('/supplierOrder/list').get(catchErrors(supplierOrderController.list));
router.route('/supplierOrder/filter').get(catchErrors(supplierOrderController.filter));

// //_________________________________________________________________API for expenses_____________________

router.route('/expense/create').post(catchErrors(expenseController.create));
router.route('/expense/read/:id').get(catchErrors(expenseController.read));
router.route('/expense/update/:id').patch(catchErrors(expenseController.update));
router.route('/expense/delete/:id').delete(catchErrors(expenseController.delete));
router.route('/expense/search').get(catchErrors(expenseController.search));
router.route('/expense/list').get(catchErrors(expenseController.list));
router.route('/expense/filter').get(catchErrors(expenseController.filter));

// //_________________________________________________________________API for expense categories________________

router.route('/expenseCategory/create').post(catchErrors(expenseCategoryController.create));
router.route('/expenseCategory/read/:id').get(catchErrors(expenseCategoryController.read));
router.route('/expenseCategory/update/:id').patch(catchErrors(expenseCategoryController.update));
router.route('/expenseCategory/delete/:id').delete(catchErrors(expenseCategoryController.delete));
router.route('/expenseCategory/search').get(catchErrors(expenseCategoryController.search));
router.route('/expenseCategory/list').get(catchErrors(expenseCategoryController.list));
router.route('/expenseCategory/filter').get(catchErrors(expenseCategoryController.filter));

// //_____________________________________________ API for client payments_________________

router.route('/payment/Factura/create').post(catchErrors(paymentFacturaController.create));
router.route('/payment/Factura/read/:id').get(catchErrors(paymentFacturaController.read));
router.route('/payment/Factura/update/:id').patch(catchErrors(paymentFacturaController.update));
router.route('/payment/Factura/delete/:id').delete(catchErrors(paymentFacturaController.delete));
router.route('/payment/Factura/search').get(catchErrors(paymentFacturaController.search));
router.route('/payment/Factura/list').get(catchErrors(paymentFacturaController.list));
router.route('/payment/Factura/filter').get(catchErrors(paymentFacturaController.filter));
router.route('/payment/Factura/pdf/:id').get(catchErrors(paymentFacturaController.generatePDF));
router.route('/payment/Factura/summary').get(catchErrors(paymentFacturaController.summary));

//router.route('/payment/Factura/mail').post(catchErrors(paymentFacturaController.sendMail));

// //_________________________________________________________________API for Offers_____________________

router.route('/offer/create').post(catchErrors(offerController.create));
router.route('/offer/read/:id').get(catchErrors(offerController.read));
router.route('/offer/update/:id').patch(catchErrors(offerController.update));
router.route('/offer/delete/:id').delete(catchErrors(offerController.delete));
router.route('/offer/search').get(catchErrors(offerController.search));
router.route('/offer/list').get(catchErrors(offerController.list));
router.route('/offer/filter').get(catchErrors(offerController.filter));
router.route('/offer/pdf/:id').get(catchErrors(offerController.generatePDF));
router.route('/offer/summary').get(catchErrors(offerController.summary));

module.exports = router;
