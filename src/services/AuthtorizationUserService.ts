import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

import Users from '../models/Users';
import AppError from '../errors/AppError';

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
      throw new AppError('Incorrect Email/Password combination', 401);
    }

    if (!(await compare(password, user.password))) {
      throw new AppError('Incorrect Email/Password combination', 401);
    }
    const { expiresIn, secretKey } = authConfig.jwt;
    const token = jwt.sign({}, secretKey, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthtorizationUserService;
