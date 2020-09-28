export default interface ISendEmail {
  sendEmail(to: string, bady: string): Promise<void>;
}
