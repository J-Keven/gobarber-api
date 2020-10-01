import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import ISendEmail from '../model/ISendEmail';
import ISendEmailDTO from '../dtos/ISendEmailDTO';
import IMailTampleteProvider from '../../MailTemplateProvider/model/IMailTemplateProvider';

@injectable()
class EntherealMailProvider implements ISendEmail {
  private client: Transporter;

  private mailTemplateProvider: IMailTampleteProvider;

  constructor(
    @inject('MailTemplateProvider')
    mailTemplateProvider: IMailTampleteProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });

    this.mailTemplateProvider = mailTemplateProvider;
  }

  public async sendEmail({
    to,
    from,
    subject,
    dataTemplate,
  }: ISendEmailDTO): Promise<void> {
    const info = await this.client.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || 'Equipe Gobarber',
        address: from?.email || 'equipegobarber@gobaber.com',
      },
      subject,
      html: await this.mailTemplateProvider.parse(dataTemplate),
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

export default EntherealMailProvider;
