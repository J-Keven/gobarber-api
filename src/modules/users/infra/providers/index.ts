import { container } from 'tsyringe';

import IHashProvider from './hashProviders/model/IHashProvider';
import BCryptHashProviders from './hashProviders/implementations/BCryptHashProviders';

container.registerSingleton<IHashProvider>(
  'HashProviders',
  BCryptHashProviders,
);
