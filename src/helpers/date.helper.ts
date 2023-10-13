import moment from 'moment';

export const formatFilterDate = (date: any) => date.format('yyyy-MM-DD');
export const formatDateDetailed = (date: string) => moment(date).format('ddd, Do [of] MMMM, YYYY');

// Original date string
const originalDateStr = "2023-07-18 16:40:51";

// Step 1: Parse the original date string into a date object
const originalDate = new Date(originalDateStr);

// Step 2: Format the date object into the desired format ("21/02/23")
export const formattedDate = `${originalDate.getDate()}/${originalDate.getMonth() + 1}/${originalDate
  .getFullYear()
  .toString()
  .slice(-2)}`;
