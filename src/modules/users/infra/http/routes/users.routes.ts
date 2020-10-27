import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multerConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const usersRoutes = Router();
const upload = multer(multerConfig);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required().min(6),
    },
  }),
  usersController.create,
);

usersRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  ensureAuthenticated,
  usersAvatarController.update,
);
export default usersRoutes;
