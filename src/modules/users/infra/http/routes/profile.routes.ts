import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UserProfileController from '../controllers/UserProfileController';

const uerProfileController = new UserProfileController();

const profileRoutes = Router();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', uerProfileController.show);
profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      oldPassword: Joi.string().optional(),
      password: Joi.string().optional(),
      confirmPassword: Joi.string().optional().valid(Joi.ref('password')),
    },
  }),
  uerProfileController.update,
);

export default profileRoutes;
