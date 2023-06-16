import { loggerType } from '@/loaders/logger';
import { Container } from 'typedi';

export function errorHandler(err: Error): Error {
	const logger: loggerType = Container.get('logger');
	logger.error('🔥🔥🔥 error: %o', err);
	return err;
}
