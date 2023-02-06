const User = require('../models/user.model');

exports.validUserTransfer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      id,
      status: 'available',
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User history not found',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
