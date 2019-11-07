import idGenerator from 'uuid/v1';

export const generateId = () => idGenerator();
export const instantTime = () => {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
