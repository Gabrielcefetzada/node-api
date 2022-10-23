import { Request, Response } from 'express';
import { GetTagsService } from '../services/GetTagsService';

class GetTagsController {
  async handle(request: Request, response: Response) {
    try {
      const getTagsService = new GetTagsService();

      const tags = await getTagsService.execute();

      return response.json(tags);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { GetTagsController };
