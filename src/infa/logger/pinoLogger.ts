import Pino from 'pino';

const formatters = {
  level(label: string) {
    return { level: label };
  }
};

export const logger = Pino({
  formatters
});
