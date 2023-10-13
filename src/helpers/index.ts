import * as yup from 'yup';

export const isEmpty = (string: string) => string === '';

export const parseUrl = (link: string) => (link.endsWith('/') ? link : `${link}/`);

export const isUrl = (value: string) => yup.string().url().isValidSync(value);
export const isBaseUrl = (value: string) => value.endsWith('https://') || value.endsWith('http://');

export const convertImageToBase64 = async (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64String = dataUrl.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const convertUrlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64String = dataUrl.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


export const goToLink = (link: string) => {
  const a = document.createElement('a');
  a.href = link;
  // a.target = '_blank';
  a.rel = 'noopener nonreferrer';
  a.click();
};

export const goToLinkNewTab = (link: string) => {
  const a = document.createElement('a');
  a.target = '_blank';
  a.href = link;
  a.rel = 'noopener nonreferrer';
  a.click();
};

/**
 * This helps to remove any field that has empty strings.
 * @param values An object that holds key value pairs
 * @returns an object that is sanitized.
 */
 export const sanitiseFormData = (values: { [x: string]: any }) => {
  const keys = Object.keys(values);
  const newValues: { [x: string]: any } = {}; // Define the type of newValues explicitly
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const value = values[key];
    if (value) newValues[key] = value;
  }
  return newValues;
};


export const getEventImage = (images: string[]) => {
  const defaultImage =
    'https://images.pexels.com/photos/7991486/pexels-photo-7991486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    images.find(
      (image) => image.startsWith('http://res.cloudinary.com') || image.startsWith('https://res.cloudinary.com')
    ) || defaultImage
  );
};

export const roundToNearest10 = (num: number) => Math.ceil(num / 10) * 10;
