import { container } from 'tsyringe';

import IStorageProvider from './StoregeProviders/model/IStorageProvider';
import DiskStorageProvider from './StoregeProviders/implementations/DiskStorageProvider';

import ISendEmail from './SendEmailProvider/model/ISendEmail';
import EtherealMailProvider from './SendEmailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/model/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StoregeProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<ISendEmail>(
  'SendEmail',
  container.resolve(EtherealMailProvider),
);
