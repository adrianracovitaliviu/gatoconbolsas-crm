const fs = require('fs');
const path = require('path');
const custom = require('@/controllers/middlewaresControllers/pdfController');
const { SendFactura } = require('@/emailTemplate/SendFactura');
const mongoose = require('mongoose');
const FacturaModel = mongoose.model('Factura');
const ClientModel = mongoose.model('Client');
const ObjectId = mongoose.Types.ObjectId;
const { Resend } = require('resend');

const sendMail = async (req, res) => {
  const { id } = req.body;

  // Throw error if no id
  if (!id) {
    throw { name: 'ValidationError' };
  }

  try {
    const result = await FacturaModel.findById(ObjectId(id)).exec();

    // Throw error if no result
    if (!result) {
      throw { name: 'ValidationError' };
    }

    // Continue process if result is returned
    const { client } = result;
    const { email, managerName } = await ClientModel.findById(client).exec();

    await custom
      .generatePdf(
        'Factura',
        { filename: 'Factura', format: 'A4' },
        result,
        async (fileLocation) => {
          // Send the mail using the details gotten from the client
          const { id: mailId } = await sendViaApi(email, managerName, fileLocation);

          // Update the status to enviado if mail was successfull
          if (mailId) {
            FacturaModel.findByIdAndUpdate(id, { status: 'enviado' })
              .exec()
              .then((data) => {
                // Returning successfull response
                return res.status(200).json({
                  success: true,
                  result: mailId,
                  message: `Se ha enviado la factura ${id} a ${email}`,
                });
              });
          }
        }
      )
      .catch((err) => {
        return res.status(500).json({
          success: false,
          result: null,
          error: err,
          message: 'Oops ha habido un error',
        });
      });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        error: err,
        message: 'Faltan campos necesarios.',
      });
    } else if (err.name == 'BSONTypeError') {
      // If err is thrown by Mongoose due to invalid ID
      return res.status(400).json({
        success: false,
        result: null,
        error: err,
        message: 'ID inválido',
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

const sendViaApi = async (email, name, filePath) => {
  const absolutePath = path.normalize(filePath);
  const resend = new Resend(process.env.RESEND_API);

  // Read the file to be attatched
  const attatchedFile = fs.readFileSync(absolutePath);

  // Send the mail using the send method
  const data = await resend.emails.send({
    from: 'facturacion@elgatoconbolsas.es',
    to: email,
    subject: 'Factura From Idurar',
    attachments: [
      {
        filename: 'Factura.pdf',
        content: attatchedFile,
      },
    ],
    html: SendFactura({ name }),
  });

  return data;
};

module.exports = sendMail;
