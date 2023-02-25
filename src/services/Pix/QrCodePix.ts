import { AxiosResponse } from 'axios';
import { reqGN } from '../../api/pix';
import { IQrCode } from '../../Interfaces/IPix';
import { PixBill } from './PixBill';

interface IQrCodePix {
  execute: (valorCobranca: string) => Promise<AxiosResponse<IQrCode>>;
}

export class QrCodePix implements IQrCodePix {
  async execute(valorCobranca: string) {
    const pixBill = new PixBill();
    const pixBillResponse = await pixBill.execute(valorCobranca);

    const reqGNAPI = await reqGN();

    const qrcodeResponse = await reqGNAPI.get(
      `/v2/loc/${pixBillResponse.cobResponse.data.loc.id}/qrcode`
    );

    return qrcodeResponse;
  }
}
