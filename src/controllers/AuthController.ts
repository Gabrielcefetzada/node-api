import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthService";

class AuthController {
    async handle(request: Request, response: Response){
        const { email, password } = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({
            email,
            password,
        });

        return response.json(token);
    }
}

export { AuthController };