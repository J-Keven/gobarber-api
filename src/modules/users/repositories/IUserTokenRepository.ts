import IUserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
  generate(userId: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | undefined>;
}
