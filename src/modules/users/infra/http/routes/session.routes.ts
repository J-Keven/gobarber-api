import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionRoutes = Router();
const sessionsController = new SessionsController();
sessionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    },
  }),
  sessionsController.create,
);

export default sessionRoutes;
