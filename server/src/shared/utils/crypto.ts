import CryptoJS from 'crypto-js';
import config from '../../config';
export const encrypt = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), config.jwt.secret).toString();
};

export const decrypt = (token: string): any => {
  const bytes = CryptoJS.AES.decrypt(token, config.jwt.secret);
  const decryptedToken = bytes.toString(CryptoJS.enc.Latin1);
  return JSON.parse(decryptedToken);
};
