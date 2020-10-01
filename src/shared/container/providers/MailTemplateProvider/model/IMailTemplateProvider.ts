import IParseTemplateDTO from '../dtos/IParseTemplateDTO';

export default interface IMailTemplateProvidre {
  parse(data: IParseTemplateDTO): Promise<string>;
}
