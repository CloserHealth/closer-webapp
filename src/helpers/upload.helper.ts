/* eslint-disable no-restricted-syntax */
export const getFileMetadata = (file: Blob) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const file = e.target?.result;
      if (file) res(file);
      else rej(new Error('file is encrypted or corrupt!.'));
    };
  });

  export const getFormData = <T extends Record<string, unknown>>(values: T) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const actualValue = values[key as keyof T];
      const stringValue = String(actualValue); // Convert to string
  
      if (Array.isArray(actualValue)) {
        actualValue.forEach((val) => formData.append(`${key}[]`, String(val))); // Convert array values to strings
      } else {
        formData.append(key, stringValue);
      }
    });
    return formData;
  };
  
  

/**
 *
 * @param name the name
 * @param {string | Blob[]} files the file values
 * @returns {Promise<FormData>}
 */
export const getFileFormData = (files: string | Blob[], name = 'files'): Promise<FormData> =>
  new Promise((res, rej) => {
    const formData = new FormData();
    for (const file of files) {
      formData.append(name, file);
    }
    res(formData);
  });

function generateRandomFileName(extension: string) {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000000);
  const fileName = `${timestamp}_${randomNumber}${extension}`;

  return fileName;
}

export async function getFileFromBase64(
  base64String: string,
  filename = generateRandomFileName('.png'),
  type = 'image/png'
) {
  const response = await fetch(`${base64String}`);
  const blob = await response.blob();
  const file = new File([blob], filename, {
    type,
  });

  return file;
}
