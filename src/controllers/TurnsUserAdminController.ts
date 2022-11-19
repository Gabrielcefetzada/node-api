import { Request, Response } from 'express';
import { TurnsUserAdminService } from '../services/TurnsUserAdminService';

class TurnsUserAdminController {
    async handle(request: Request, response: Response){

        const { pin, userId } = request.body;
        try {
            const turnsUserAdminService = new TurnsUserAdminService()
            await turnsUserAdminService.execute(pin, userId);
            return response.json("Usuário agora é administrador");
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { TurnsUserAdminController }