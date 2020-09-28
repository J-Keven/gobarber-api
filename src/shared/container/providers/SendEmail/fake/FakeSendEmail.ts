import ISendEmail from '../model/ISendEmail';

interface Email {
  to: string;
  body: string;
}

class FakeSendEmail implements ISendEmail {
  private emails: Email[] = [];

  public async sendEmail(to: string, body: string): Promise<void> {
    this.emails.push({ to, body });
  }
}

export default FakeSendEmail;
