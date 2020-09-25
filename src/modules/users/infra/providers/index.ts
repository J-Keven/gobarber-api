import { container } from 'tsyringe';

import IHashProvider from './hashProviders/models/IHashProvider';
import BCryptHashProviders from './hashProviders/implementations/BCryptHashProviders';

container.registerSingleton<IHashProvider>(
  'BCryptHashProviders',
  BCryptHashProviders,
);
