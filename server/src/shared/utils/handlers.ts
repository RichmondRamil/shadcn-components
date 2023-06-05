import { loggerType } from '@/loaders/logger';
import { Container } from 'typedi';
const logger: loggerType = Container.get('logger');

export function errorHandler(err: Error): Error {
  logger.error('🔥🔥🔥 error: %o', err);
  return err;
}
