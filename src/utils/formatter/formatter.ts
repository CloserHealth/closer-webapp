export const firstLetter = (str: string): string => {
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
};

// Format date
export const formatDate = (date: any) => {
  const originalDate = new Date(date);
  const formattedDate = `${originalDate.getDate()}/${originalDate.getMonth() + 1}/${originalDate
    .getFullYear()
    .toString()
    .slice(-2)}`;
  
  return formattedDate;
}

