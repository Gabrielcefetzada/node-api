import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UserRepositories';

class TurnsUserAdminService {
  async execute(pin: string, userId: string) {
    const userRepositories = getCustomRepository(UsersRepositories);
    const userExists = await userRepositories.findOne({ id: userId });
    if (!userExists) {
      throw new Error('Pin e/ou usuário incorreto(s)');
    }

    if (pin === process.env.PIN_TURNS_USER_ADMIN) {
      const userRepositories = getCustomRepository(UsersRepositories);
      await userRepositories.update(
        {
          id: userId,
        },
        {
          admin: true,
        }
      );
    } else {
      throw new Error('Pin e/ou usuário incorreto(s)');
    }
  }
}

export { TurnsUserAdminService };
