import IParseTemplateDTO from '../../MailTemplateProvider/dtos/IParseTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}
export default interface ISendEmailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  dataTemplate: IParseTemplateDTO;
}
