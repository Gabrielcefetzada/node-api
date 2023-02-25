import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import axios, { AxiosError } from 'axios';

interface IAuthPix {
  execute: () => Promise<{ pixAccessToken: string; agent: https.Agent }>;
}

export class AuthPix implements IAuthPix {
  async execute() {
    let pixAccessToken: string;
    const cert = fs.readFileSync(
      path.resolve(__dirname, `../../../certs/${process.env.GN_CERT}`)
    );

    const agent = new https.Agent({
      pfx: cert,
      passphrase: '',
    });

    const credentials = Buffer.from(
      `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`
    ).toString('base64');

    try {
      const authPixResponse = await axios({
        method: 'POST',
        url: `${process.env.GN_ENDPOINT}/oauth/token`,
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        httpsAgent: agent,
        data: {
          grant_type: 'client_credentials',
        },
      });

      pixAccessToken = authPixResponse.data?.access_token;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new AxiosError(error?.message);
      }

      throw new Error('Erro de servidor');
    }

    return { pixAccessToken, agent };
  }
}
