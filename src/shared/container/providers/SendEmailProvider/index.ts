import { container } from 'tsyringe';
import mailConfigs from '@config/mail';

import ISendEmail from './model/ISendEmail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<ISendEmail>(
  'SendEmail',
  providers[mailConfigs.driver],
);
