import IMailTemplateProvider from '../model/IMailTemplateProvider';

class FakeMilTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'fake mail Template content';
  }
}

export default FakeMilTemplateProvider;
