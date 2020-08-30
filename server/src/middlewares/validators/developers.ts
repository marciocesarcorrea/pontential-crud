import { celebrate, Segments, Joi } from "celebrate";

export const developers = {
  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  post: celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.any().strip(),
      nome: Joi.string().required().label("Nome"),
      sexo: Joi.string().uppercase().valid("M", "F").required().label("Sexo"),
      hobby: Joi.string().label("Hobby"),
      dataNascimento: Joi.date().required().label("Data de Nascimento"),
    }),
  }),
  put: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id: Joi.any().strip(),
      nome: Joi.string().label("Nome"),
      sexo: Joi.string().uppercase().valid("M", "F").label("Sexo"),
      hobby: Joi.string().label("Hobby"),
      dataNascimento: Joi.date().label("Data de Nascimento"),
    }),
  }),
  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
};
