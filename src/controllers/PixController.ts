import { Request, Response } from 'express';
import { Pix } from '../services/PixService';

class PixController {
  async handle(request: Request, response: Response) {
    const { valorCobranca } = request.body;
    const pixService = new Pix();

    const pix = await pixService.execute(valorCobranca);

    return response.render('qrcode', {
      qrcodeImage: pix.data.imagemQrcode,
    });
  }
}

export { PixController };
