const filter = async (Model, req, res) => {

  let query = Model.find({});

  for (const [key, value] of Object.entries(req.query)) {

    if (key === 'sessionId') {
      query = query.where('user').equals(value);

    } else if (key === 'startDate' && req.query.endDate) { // Start & End Date filter
      query = query.where('created').gte(new Date(value)).lte(new Date(req.query.endDate));

    } else if (key === 'startDate') { // Start Date filter
      query = query.where('created').gte(new Date(value));

    } else if (key === 'endDate') { // End Date filter
      query = query.where('created').lte(new Date(value));

    } else {
      query = query.where(key).equals(value);
    }
  }

  const result = await query.exec();

  if (!result) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No document found ',
    });
  } else {
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully found all documents  ',
    });
  }
};

module.exports = filter;
