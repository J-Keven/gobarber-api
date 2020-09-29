import nodemailer, { Transporter } from 'nodemailer';
import ISendEmail from '../model/ISendEmail';

class EntherealMailProvider implements ISendEmail {
  private client: Transporter;

  constructor() {
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
  }

  public async sendEmail(to: string, bady: string): Promise<void> {
    const message = {
      from: 'Equipe Gobarber <equipegobarber@gobarber.com>',
      to,
      subject: 'Recuperação de senha',
      text: bady,
    };

    const info = await this.client.sendMail(message);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

export default EntherealMailProvider;
