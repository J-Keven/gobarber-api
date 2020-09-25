import { compare, hash } from 'bcryptjs';
import IHashProviders from '../models/IHashProvider';

class BCryptHashProviders implements IHashProviders {
  public async compare(payload: string, hashed: string): Promise<boolean> {
    const isEqual = await compare(payload, hashed);

    return isEqual;
  }

  public async create(payload: string): Promise<string> {
    const hashed = await hash(payload, 8);

    return hashed;
  }
}

export default BCryptHashProviders;
