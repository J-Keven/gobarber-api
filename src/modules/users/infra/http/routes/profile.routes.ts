import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UserProfileController from '../controllers/UserProfileController';

const uerProfileController = new UserProfileController();

const profileRoutes = Router();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', uerProfileController.show);
profileRoutes.put('/', uerProfileController.update);

export default profileRoutes;
