const { Router } = require('express');
const {
  RegisterCount,
  loginCount,
  getHistory,
} = require('../controllers/user.controller');

const router = Router();

// Esta petición creará una nueva cuenta para el usuario.
router.post('/signup', RegisterCount);

// El usuario ingresa su número de cuenta y su contraseña
router.post('/login', loginCount);

// Obtiene todas las transferencias hechas por el usuario en sesión
router.get('/:id/history', getHistory);

module.exports = {
  usersRouter: router,
};
