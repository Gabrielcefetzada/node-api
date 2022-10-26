import { verify } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IPayload {
    sub: string;
  }

export class GetUserService {

    async execute(token: string){

        const hashSplitted = token.split(" ")[1];

        const { sub } = verify(hashSplitted, process.env.SECRET_JWT) as IPayload;
        const userId = sub;
        const userReposities = getCustomRepository(UsersRepositories);
        const userData = await userReposities.findOne({ id: userId })
        return userData;
    }
}