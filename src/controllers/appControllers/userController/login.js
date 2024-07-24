const Joi = require('joi');

const mongoose = require('mongoose');

const authUser = require('./authUser');

const login = async (req, res, { userModel }) => {

  const UserModel = mongoose.model(userModel);
  const { email, password } = req.body;
  // validate
  const objectSchema = Joi.object({
    email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
    password: Joi.string().required(),
  });
  
  const { error, value } = objectSchema.validate({ email, password });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: 'Invalid/Missing credentials.',
      errorMessage: error.message,
    });
  }
  
  const user = await UserModel.findOne({ email });
  
  if (!user)
    return res.status(404).json({
  success: false,
  result: null,
  message: 'No account with this email has been registered.',
});


  authUser(req, res, { user, password, UserModel });
};

module.exports = login;
