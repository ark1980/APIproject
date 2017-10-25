// Routes
const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const UserController = require('../controllers/users');
const { validateParam,validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(UserController.showUsers)
  .post(validateBody(schemas.userSchema), UserController.createUser)
  .delete(UserController.deleteAllUsers);

router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'),UserController.showUser)
  .put(validateBody(schemas.userSchema), UserController.updateUser)
  .delete(UserController.deleteUser);

router.route('/:userId/cars')
  .get(UserController.showUserCars)
  .post(UserController.newUserCar);
  

module.exports = router;