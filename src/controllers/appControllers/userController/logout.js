const mongoose = require('mongoose');

const logout = async (req, res, { userModel }) => {
  const User = mongoose.model(userModel);

  const token = req.cookies.token;
  await User.findOneAndUpdate(
    { email: req.body.email },
    { $pull: { loggedSessions: token } },
    {
      new: true,
    }
  ).exec();

  res
    .clearCookie('token', {
      maxAge: null,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      domain: req.hostname,
      Path: '/',
    })
    .json({
      success: true,
      result: {},
      message: 'Successfully logout',
    });
};

module.exports = logout;
