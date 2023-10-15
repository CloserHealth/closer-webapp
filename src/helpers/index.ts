import * as yup from 'yup';

export const isEmpty = (string: string) => string === '';

export const parseUrl = (link: string) => (link.endsWith('/') ? link : `${link}/`);

export const isUrl = (value: string) => yup.string().url().isValidSync(value);
export const isBaseUrl = (value: string) => value.endsWith('https://') || value.endsWith('http://');


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

  // Calculate days left
// Calculate days left
export const calculateDaysLeft = (endDateStr: string | number | Date, startDateStr: string | number | Date) => {
  const endDate = new Date(endDateStr);
  const startDate = new Date(startDateStr);
  const currentDate = new Date();

  if (isNaN(endDate.getTime()) || isNaN(startDate.getTime())) {
    throw new Error('Invalid date format');
  }

  // Calculate the difference in milliseconds
  const differenceInMillis = endDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const daysLeft = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));

  return daysLeft;
};

