const create = async (Model, req, res) => {
  try {
    // Creating a new document in the collection

    const result = await new Model(req.body).save();

    // Returning successfull response
    return res.status(200).json({
      success: true,
      result,
      message: 'Creado con éxito.',
    });
  } catch (err) {
    console.error(err.stack);
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Faltan campos necesarios.',
        error: err,
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        message: 'Oops ha habido un error',
        error: err,
      });
    }
  }
};

module.exports = create;
