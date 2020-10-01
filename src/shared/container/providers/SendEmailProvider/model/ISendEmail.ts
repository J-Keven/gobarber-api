import ISendEmailDTO from '../dtos/ISendEmailDTO';

export default interface ISendEmail {
  sendEmail(data: ISendEmailDTO): Promise<void>;
}
