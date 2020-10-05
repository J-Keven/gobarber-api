import { Router } from 'express';
import ensureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListProvidersController from '../controllers/ListProvidersController';

const listProviders = Router();
listProviders.use(ensureAtheticated);

const listProvidersController = new ListProvidersController();

listProviders.get('/', listProvidersController.index);

export default listProviders;
