import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import Users from '../models/Users';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUsersService {
  public async execute({ name, email, password }: RequestDTO): Promise<Users> {
    const usersRepository = getRepository(Users);
    const userEmail = await usersRepository.findOne({
      where: { email },
    });

    if (userEmail) {
      throw Error('Email address already used');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(newUser);

    delete newUser.password;
    return newUser;
  }
}

export default CreateUsersService;
