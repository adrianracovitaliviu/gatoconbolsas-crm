const update = async (Model, req, res) => {
  try {
    // Find document by id and updates with the required fields
    const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, req.body, {
      new: true, // return the new result instead of the old one
      runValidators: true,
    }).exec();
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found by this id: ' + req.params.id,
      });
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: 'Se ha actualizado el documento con id: ' + req.params.id,
      });
    }
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Faltan campos obligatorios',
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

module.exports = update;
