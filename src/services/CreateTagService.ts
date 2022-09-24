import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagRepositories"

interface ITagProps {
    name: string;
}

class CreateTagService {

    async execute({name}: ITagProps){
        const isFirstLetterUpperCase = /^[A-Z][a-z0-9_-]{3,19}$/;
        const tagsRepositories = getCustomRepository(TagsRepositories)

        if(!name){
            throw new Error("Incorrect or empty name!")
        }

        if(!name.match(isFirstLetterUpperCase)){
            throw new Error("The first letter must be uppercase!")
        }

        const tagAlreadyExists = await tagsRepositories.findOne({name}) 
        if(tagAlreadyExists){
            throw new Error("Tag already exists!")
        }

        const tag = tagsRepositories.create({name})

        await tagsRepositories.save(tag)

        return tag
    }
}

export { CreateTagService } 