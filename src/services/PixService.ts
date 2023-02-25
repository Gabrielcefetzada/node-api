import { AxiosResponse } from 'axios';
import { IQrCode } from '../Interfaces/IPix';
import { QrCodePix } from './Pix/QrCodePix';

interface IPix {
  execute: (valorCobranca: string) => Promise<AxiosResponse<IQrCode>>;
}

class Pix implements IPix {
  async execute(valorCobranca: string) {
    const qrCodePix = new QrCodePix();
    const qrCodePixResponse = await qrCodePix.execute(valorCobranca);
    return qrCodePixResponse;
  }
}

export { Pix };
