import IHashProvider from '../models/IHashProvider';

class FakeHashProviderRepository implements IHashProvider {
  public async compare(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }

  public async create(payload: string): Promise<string> {
    return payload;
  }
}

export default FakeHashProviderRepository;
