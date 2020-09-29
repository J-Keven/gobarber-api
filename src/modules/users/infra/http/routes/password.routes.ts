import { Router } from 'express';
import SendPasswordRecoveryEmailController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const sendPasswordRecoveryEmailController = new SendPasswordRecoveryEmailController();
const resetPasswordController = new ResetPasswordController();

const passwordRoutes = Router();
passwordRoutes.post('/forgot', sendPasswordRecoveryEmailController.create);
passwordRoutes.post('/reset', resetPasswordController.create);
export default passwordRoutes;
