export const toDDMMYYYY = (dateString) => {
  return dateString.split('-').reverse().join('/');
};
