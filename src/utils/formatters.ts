import { INFO } from './constant';

export const formatInfoBoardText = (
  input: number | undefined,
  type: INFO
): string => {
  if (!input) return '?';
  let firstChar = '';
  if ([INFO.RANK, INFO.SCORE].includes(type)) firstChar = '#';
  return firstChar + input;
};
