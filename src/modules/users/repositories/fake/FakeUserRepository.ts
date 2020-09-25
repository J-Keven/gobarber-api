import { uuid } from 'uuidv4';
import ICReateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/Users';

class UserRepositor implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(userItem => userItem.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(userItem => userItem.email === email);

    return user;
  }

  public async create({
    email,
    password,
    name,
  }: ICReateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[userIndex] = user;
    return user;
  }
}

export default UserRepositor;
