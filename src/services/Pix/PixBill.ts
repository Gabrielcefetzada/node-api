import { reqGN } from '../../api/pix';
import { ICobranca, IConfig } from '../../Interfaces/IPix';
import { AuthPix } from './AuthPix';
import * as https from 'https';
import { AxiosResponse } from 'axios';

interface IAxiosCobrancaResponse extends AxiosResponse {
  data: ICobranca;
}

interface IPixBill {
  execute: (valorCobranca: string) => Promise<{
    cobResponse: IAxiosCobrancaResponse;
    config: IConfig;
    authPixResponse: { pixAccessToken: string; agent: https.Agent };
  }>;
}

export class PixBill implements IPixBill {
  async execute(valorCobranca: string) {
    const authPix = new AuthPix();
    const authPixResponse = await authPix.execute();

    const dataCob = {
      calendario: {
        expiracao: 3600,
      },
      valor: {
        original: valorCobranca,
      },
      chave: '31995409722',
      solicitacaoPagador: 'Informe o número ou identificador do pedido.',
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authPixResponse.pixAccessToken}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: authPixResponse.agent,
    };

    const reqGNAPI = await reqGN();

    const cobResponse = await reqGNAPI.post('v2/cob', dataCob, config);
    return { cobResponse, config, authPixResponse };
  }
}
