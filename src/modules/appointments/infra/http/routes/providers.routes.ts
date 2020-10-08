import { Router } from 'express';
import ensureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListProvidersController from '../controllers/ListProvidersController';
import ProvidersMonthAvailabilityController from '../controllers/ProvidersMonthAvailabilityController';
import ProvidersDayAvailabilityController from '../controllers/ProvidersDayAvailabilityController';

const listProviders = Router();
listProviders.use(ensureAtheticated);

const listProvidersController = new ListProvidersController();
const providersDayAvailabilityController = new ProvidersDayAvailabilityController();
const providersMonthAvailabilityController = new ProvidersMonthAvailabilityController();

listProviders.get('/', listProvidersController.index);
listProviders.get(
  '/:provider_id/month-availability',
  providersMonthAvailabilityController.index,
);
listProviders.get(
  '/:provider_id/day-availability',
  providersDayAvailabilityController.index,
);

export default listProviders;
