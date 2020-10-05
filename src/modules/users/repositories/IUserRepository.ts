import User from '@modules/users/infra/typeorm/entities/Users';
import IListProvidersDTO from '@modules/users/dtos/IListProvidersDTO';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllProviders(exeptUserId: IListProvidersDTO): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
