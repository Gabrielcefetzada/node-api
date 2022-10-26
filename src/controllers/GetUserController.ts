import { Request, Response } from 'express';
import { GetUserService } from '../services/GetUserService';

class GetUserController {
    async handle(request: Request, response: Response){

        const token = request.headers.authorization;

        try {
            const userService = new GetUserService()
            const user = await userService.execute(token)
            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { GetUserController }