import { format } from 'node:util';

import { LogData } from '@common/shared/types/LogData';

export const formatLogData = (data: LogData): string => {
  const { text, args } = data;
  const placeholderCount = (text.match(/%[sd]/g) || []).length;
  if (placeholderCount !== args.length) {
    throw new Error(
      'Number of placeholders does not match number of arguments'
    );
  }
  return format(text, ...args);
};
