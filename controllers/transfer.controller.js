const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.transferAmount = async (req, res, next) => {
  try {
    const { amount, accountNumber, senderUserId } = req.body;

    const userRT = await User.findOne({
      where: {
        status: 'available',
        accountNumber: accountNumber,
      },
    });
    const receiverUserId = userRT.id;

    const userMT = await User.findOne({
      where: {
        status: 'available',
        id: senderUserId,
      },
    });

    if (amount > userMT.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'insufficient funds',
      });
    }

    if (receiverUserId === senderUserId) {
      return res.status(400).json({
        status: 'error',
        message: 'you cant send money yourself',
      });
    }

    const newAmountUserMakeTransfer = userMT.amount - amount;

    const newAmountUserReceiver = userRT.amount + amount;

    await userMT.update({ amount: newAmountUserMakeTransfer });

    await userRT.update({ amount: newAmountUserReceiver });

    await Transfer.create({ amount, senderUserId, receiverUserId });

    res.status(200).json({
      status: 'success',
      message: 'Transfer sent successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
