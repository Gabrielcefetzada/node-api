import { UsersRepositories } from "../repositories/UserRepositories";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: IUserRequest) {
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
            password: passwordHash,
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };
