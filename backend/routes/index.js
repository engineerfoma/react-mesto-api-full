const express = require('express');

const routes = express.Router();
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const { signOut } = require('../controllers/users');
const { NotFoundError } = require('../errors/not-found-err');

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.get('/signout', signOut);
routes.use((req, res, next) => {
  try {
    return next(new NotFoundError('Страница не найдена'));
  } catch (e) {
    return next();
  }
});

module.exports = {
  routes,
};
