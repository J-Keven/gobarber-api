import { container } from 'tsyringe';

import IStorageProvider from './StoregeProviders/model/IStorageProvider';
import DiskStorageProvider from './StoregeProviders/implementations/DiskStorageProvider';

import ISendEmail from './SendEmail/model/ISendEmail';
import EtherealMailProvider from './SendEmail/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StoregeProvider',
  DiskStorageProvider,
);

container.registerInstance<ISendEmail>('SendEmail', new EtherealMailProvider());
