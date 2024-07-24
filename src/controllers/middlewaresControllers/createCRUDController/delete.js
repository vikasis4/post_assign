const remove = async (Model, req, res) => {

  let result = await Model.findByIdAndDelete({
    _id: req.params.id,
  }).exec();

  if (!result) {

    return res.status(404).json({
      success: true,
      result,
      message: 'Not found Operation failed',
    });

  } else {

    return res.status(200).json({
      success: true,
      result,
      message: 'Deleted successfully',
    });
  }


};

module.exports = remove;
