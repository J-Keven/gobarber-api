import { container } from 'tsyringe';

import IStorageProvider from './model/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StoregeProvider',
  providers.disk,
);
