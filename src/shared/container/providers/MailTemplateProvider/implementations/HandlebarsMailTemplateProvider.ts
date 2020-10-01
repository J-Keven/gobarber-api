import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplateProvider from '../model/IMailTemplateProvider';
import IParseTemplateDTO from '../dtos/IParseTemplateDTO';

class HandlebarsMailTemplatProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseTemplateDTO): Promise<string> {
    const templateContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const compile = handlebars.compile(templateContent);

    return compile(variables);
  }
}

export default HandlebarsMailTemplatProvider;
