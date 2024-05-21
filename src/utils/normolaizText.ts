export const Normalize = (str: string | null) => {
  if (str === null) return null;
  if (str.length === 0) return null;
  return str[0].toUpperCase() + str.slice(1);
};
