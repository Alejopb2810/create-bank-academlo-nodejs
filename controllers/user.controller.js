const User = require('../models/user.model');

exports.RegisterCount = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const accountNumber = Math.floor(
      Math.random() * (999999 - 100000) + 100000
    );

    const amount = 1000;

    const newCount = await User.create({
      name: name.toLowerCase(),
      accountNumber,
      password,
      amount,
    });

    res.status(200).json({
      status: 'success',
      message: 'Count created successfully',
      newCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
//304379
//deb12345
// 248671
// 28102023
exports.loginCount = async (req, res) => {
  try {
    const { password, accountNumber } = req.body;

    const count = await User.findOne({
      where: {
        status: 'available',
        accountNumber,
        password,
      },
    });
    if (!count) {
      return res.status(404).json({
        status: 'error',
        message: 'Count not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Count was found successfully',
      count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const { user } = req;

    res.status(200).json({
      status: 'success',
      message: 'user history found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
