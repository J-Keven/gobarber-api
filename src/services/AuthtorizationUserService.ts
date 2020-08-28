import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}
class AuthtorizationUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('Incorrect Email/Password combination');
    }

    if (!(await compare(password, user.password))) {
      throw Error('Incorrect Email/Password combination');
    }

    const token = jwt.sign({}, '8538607221f2e42284acf599214cfa34', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthtorizationUserService;
