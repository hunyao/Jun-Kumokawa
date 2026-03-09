import { CowMessages as messages } from '@data/index';

type useCowType = [string];
export const useCow = (level: string): useCowType => {
  let i: number;
  if (level === '' || !/^v+$/.test(level)) {
    i = 0;
  } else {
    i = level.length < messages.length ? level.length : messages.length - 1;
  }
  return [messages[i]];
};
