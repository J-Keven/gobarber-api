import ISendEmail from '../model/ISendEmail';
import ISendEmailDTO from '../dtos/ISendEmailDTO';

interface Email {
  to: string;
  body: string;
}

class FakeSendEmail implements ISendEmail {
  private emails: Email[] = [];

  public async sendEmail({ to, dataTemplate }: ISendEmailDTO): Promise<void> {
    this.emails.push({ to: to.email, body: dataTemplate.template });
  }
}

export default FakeSendEmail;
