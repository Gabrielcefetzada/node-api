import { UsersRepositories } from '../repositories/UserRepositories';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import dayjs from 'dayjs';
import { UserTokenRepositories } from '../repositories/UserTokenRepositories';

interface AuthenticateRequestInterface {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequestInterface) {
    const usersRepository = getCustomRepository(UsersRepositories);
    const userTokenRepository = getCustomRepository(UserTokenRepositories);
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
      expiresIn: '10s',
    }); 

    const refresh_token = sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET_JWT, {
      subject: user.id,
      expiresIn: '16m',
    });

    const refresh_token_expires_date = dayjs().add(1, 'days').toDate();

    const refresh_token_created = await userTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    });

    await userTokenRepository.save(refresh_token_created)
    
    return { token, refresh_token };
  }
}

export { AuthenticateUserService };
