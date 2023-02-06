const { Router } = require('express');
const { transferAmount } = require('../controllers/transfer.controller');

const router = Router();

// Esta petición recibe el monto a transferir y el número de cuenta del destinatario y la
// cuenta de quien hace la transferencia
router.post('/', transferAmount);

module.exports = {
  transfersRouter: router,
};
