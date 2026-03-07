import messages from '@data/cow.json';

type useCowType = [string];
const useCow = (level: string): useCowType => {
  let i: number;
  if (level === '' || !/^v+$/.test(level)) {
    i = 0;
  } else {
    i = level.length < messages.length ? level.length : messages.length - 1;
  }
  return [messages[i]];
};

export default useCow;
