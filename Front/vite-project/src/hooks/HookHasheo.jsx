import { useState } from 'react';
import CryptoJS from 'crypto-js';

const secretKey = 'abcdñ1234'; // Debes almacenar esto de forma segura, por ejemplo, en variables de entorno

const useHasheo = () => {
  const [key] = useState(secretKey);

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, key).toString();
  };

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  return {
    encryptData,
    decryptData,
  };
};

export default useHasheo;
