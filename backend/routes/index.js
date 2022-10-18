const express = require('express');
const { Joi, celebrate } = require('celebrate');
const routes = express.Router();
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const { auth } = require('./middlewares/auth');

const { validateAuthentication, validateUserBody } = require('../middlewares/validations');
const { createUser, login } = require('./controllers/users');
const { signOut } = require('../controllers/users');
const { NotFoundError } = require('../errors/not-found-err');

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server Error');
  }, 0);
});
routes.post('/signup', validateUserBody, createUser);
routes.post('/signin', validateAuthentication, login);
routes.use(auth);
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
