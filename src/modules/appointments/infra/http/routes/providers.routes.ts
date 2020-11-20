import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAtheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListProvidersController from '../controllers/ProvidersController';
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
  celebrate({
    [Segments.QUERY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  providersMonthAvailabilityController.index,
);
listProviders.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.QUERY]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  providersDayAvailabilityController.index,
);

export default listProviders;
