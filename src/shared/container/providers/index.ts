import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './StoregeProviders/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StoregeProvider',
  DiskStorageProvider,
);
