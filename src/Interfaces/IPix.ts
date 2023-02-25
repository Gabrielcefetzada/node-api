import * as https from 'https';

export interface ICobranca {
  calendario: ICalendario;
  txid: string;
  revisao: number;
  loc: ILoc;
  location: string;
  status: string;
  valor: IValor;
  chave: string;
  solicitacaoPagador: string;
}

export interface ICalendario {
  criacao: string;
  expiracao: number;
}

export interface ILoc {
  id: number;
  location: string;
  tipoCob: string;
  criacao: string;
}

export interface IValor {
  original: string;
}

export interface IConfig {
  headers: IHeaders;
  httpsAgent: https.Agent;
}

export interface IHeaders {
  Authorization: string;
  'Content-Type': string;
}

export interface IQrCode {
  qrcode: string;
  imagemQrcode: string;
}
