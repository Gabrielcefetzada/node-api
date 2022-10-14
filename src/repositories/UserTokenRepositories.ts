import { EntityRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";

@EntityRepository(UserToken)
class UserTokenRepositories extends Repository<any>{
    
}

export { UserTokenRepositories }
