import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagRepositories"

class GetTagsService {

    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositories);
        const tags = await tagsRepositories.find()
        return tags;
    }
}

export { GetTagsService }