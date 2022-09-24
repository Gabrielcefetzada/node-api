import { UsersRepositories } from "../repositories/UserRepositories";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

interface IUserRequest extends IUserIsAdmin {
    name: string;
    email: string;
    password: string;
}

interface IUserIsAdmin {
    admin: boolean;
}

class CreateUserService {
    async execute({ name, email, admin, password }: IUserRequest) {
        const emailFormat =
            /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email || !email.match(emailFormat)) {
            throw new Error("E-mail format is invalid.");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new Error(`User ${name} already exists`);
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };
