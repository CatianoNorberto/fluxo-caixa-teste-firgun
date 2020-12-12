const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const UserController = require("./controllers/UserController");
const Registrations = require("./controllers/RecordsController");
const SessionController = require("./controllers/SessionController");
const UserBalanceController = require("./controllers/UserBalanceController");

const routes = express.Router();

routes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  SessionController.store
);

routes.get("/users/check-email", UserController.checkEmail);
routes.get("/users/check-cpf", UserController.checkCpf);
routes.get("/users/balance", UserBalanceController.index);

routes.post(
  "/users",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      cpf: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  UserController.store
);

routes.post(
  "/users/balance",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      balance: Joi.string().required(),
      date: Joi.string().required()
    }),
  }),
  UserBalanceController.store
);

routes.put(
  "/users/balance",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      balance: Joi.string().required(),
    }),
  }),
  UserBalanceController.update
);

routes.get("/users/registrations", Registrations.index);

routes.post(
  "/users/registrations",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      category: Joi.string().required(),
      description: Joi.string().required(),
      input: Joi.string().allow(null, ""),
      exit: Joi.string().allow(null, ""),
      balance: Joi.string().required(),
      date: Joi.string().required(),
      user_id: Joi.number().required(),
    }),
  }),
  Registrations.store
);

module.exports = routes;
