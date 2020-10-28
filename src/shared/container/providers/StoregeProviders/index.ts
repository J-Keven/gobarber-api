import { container } from 'tsyringe';
import uploadConfigs from '@config/upload';

import IStorageProvider from './model/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StoregeProvider',
  providers[uploadConfigs.driver],
);
