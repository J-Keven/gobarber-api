import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { injectable, inject } from 'tsyringe';
import mailConfigs from '@config/mail';
import ISendEmail from '../model/ISendEmail';
import ISendEmailDTO from '../dtos/ISendEmailDTO';
import IMailTampleteProvider from '../../MailTemplateProvider/model/IMailTemplateProvider';

@injectable()
class SESMailProvider implements ISendEmail {
  private client: Transporter;

  private mailTemplateProvider: IMailTampleteProvider;

  constructor(
    @inject('MailTemplateProvider')
    mailTemplateProvider: IMailTampleteProvider,
  ) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  public async sendEmail({
    to,
    from,
    subject,
    dataTemplate,
  }: ISendEmailDTO): Promise<void> {
    await this.client.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || mailConfigs.default.from.name,
        address: from?.email || mailConfigs.default.from.addrees,
      },
      subject,
      html: await this.mailTemplateProvider.parse(dataTemplate),
    });
  }
}

export default SESMailProvider;
