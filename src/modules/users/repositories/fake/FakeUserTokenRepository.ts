import { uuid } from 'uuidv4';
import IUserToken from '../IUserTokenRepository';
import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokenReposory implements IUserToken {
  private usersToken: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_Id: userId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.usersToken.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersToken.find(item => item.token === token);

    return userToken;
  }
}

export default FakeUserTokenReposory;
