export const capitalizeFirstLetter = (str: string): string =>  {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}
