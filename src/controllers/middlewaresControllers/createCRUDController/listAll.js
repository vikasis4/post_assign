const listAll = async (Model, req, res) => {
  const value = req.params.val
  const type = req.params.type

  let result = await Model.find({
    [type]: value,
  }).exec();

  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully found all documents',
    });
  } else {
    return res.status(203).json({
      success: false,
      result: [],
      message: 'Collection is Empty',
    });
  }
};

module.exports = listAll;
