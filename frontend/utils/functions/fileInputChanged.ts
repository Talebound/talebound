import React from 'react';

export const fileInputChanged = async (
  event: React.ChangeEvent<HTMLInputElement>,
  postProcess: (base64Data: string) => void,
) => {
  if (event.target.files) {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();

      // Convert data to base64
      let binary = '';
      const bytes = new Uint8Array(arrayBuffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64Data = window.btoa(binary);

      postProcess(base64Data);
    }
  }
};
