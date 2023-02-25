import axios from 'axios';
import { AuthPix } from '../services/Pix/AuthPix';

const authPix = new AuthPix();

export const reqGN = async () => {
  const authPixResponse = await authPix.execute();

  const reqGN = axios.create({
    baseURL: process.env.GN_ENDPOINT,
    httpsAgent: authPixResponse.agent,
    headers: {
      Authorization: `Bearer ${authPixResponse.pixAccessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return reqGN;
};
