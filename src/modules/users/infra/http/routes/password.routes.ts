import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SendPasswordRecoveryEmailController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const sendPasswordRecoveryEmailController = new SendPasswordRecoveryEmailController();
const resetPasswordController = new ResetPasswordController();

const passwordRoutes = Router();
passwordRoutes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  sendPasswordRecoveryEmailController.create,
);

passwordRoutes.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().min(6),
      confirmPassword: Joi.string().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);
export default passwordRoutes;
