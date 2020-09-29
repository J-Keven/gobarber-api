import { getRepository, Repository } from 'typeorm';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokens from '../entities/UserToken';

class UserTokenRepository implements IUserTokenRepository {
  private userTokenRepositoy: Repository<UserTokens>;

  constructor() {
    this.userTokenRepositoy = getRepository(UserTokens);
  }

  public async generate(userId: string): Promise<UserTokens> {
    const userToken = this.userTokenRepositoy.create({
      user_Id: userId,
    });
    await this.userTokenRepositoy.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = await this.userTokenRepositoy.findOne({
      where: { token },
    });

    return userToken;
  }
}
export default UserTokenRepository;
