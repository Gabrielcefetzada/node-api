import dayjs from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UserTokenRepositories } from '../repositories/UserTokenRepositories';

interface IPayload {
  email: string;
  sub: string;
}
class RefreshTokenService {
  async execute(refresh_token: string) {

    const userTokenRepository = getCustomRepository(UserTokenRepositories);

    const { sub } = verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET_JWT
    ) as IPayload;

    const user_id = sub;
    
    const userToken = await userTokenRepository.findOne({
      where: {
        user_id,
        refresh_token,
      },
    });

    if (!userToken) {
      throw new Error('Refresh token não encontrado');
    }

    await userTokenRepository.delete({
      id: userToken.id,
    });

    const refresh_token_expires_date = dayjs().add(1, 'days').toDate();

    const refresh_token_created = await userTokenRepository.create({
      user_id: sub,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    await userTokenRepository.save(refresh_token_created);

    const newToken = sign({}, process.env.SECRET_JWT, {
      subject: user_id,
      expiresIn: '1h',
    });

    return { refresh_token, token: newToken };
  }
}

export { RefreshTokenService };
