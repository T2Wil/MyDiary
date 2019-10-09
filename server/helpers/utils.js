/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
export const generateId = () => Math.floor(Math.random() * 1000);
export const instantTime = () => {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
