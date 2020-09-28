import { container } from 'tsyringe';

import IStorageProvider from './StoregeProviders/model/IStorageProvider';
import DiskStorageProvider from './StoregeProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StoregeProvider',
  DiskStorageProvider,
);
