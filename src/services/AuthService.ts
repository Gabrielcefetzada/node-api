import { UsersRepositories } from '../repositories/UserRepositories';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthenticateRequestInterface {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequestInterface) {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error('Email or/and Password incorrect');
    }

    const passwordMatch = await compare(password, user.password);
    if (passwordMatch === false) {
      throw new Error('Email or/and Password incorrect');
    }

    const token = sign({ email: user.email }, process.env.SECRET_JWT, {
      subject: user.id,
      expiresIn: '1d',
    });
    return token;
  }
}

export { AuthenticateUserService };
