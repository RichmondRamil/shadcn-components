import { Container } from 'typedi';
import LoggerInstance from './logger';
import { PrismaClient } from '@prisma/client';

export default () => {
	try {
		Container.set('logger', LoggerInstance);
		LoggerInstance.info('✌️ LoggerInstance injected into container');

		Container.set('PrismaClient', new PrismaClient());
		// Container.set({ id: 'PrismaClient', value: new PrismaClient() });
		LoggerInstance.info('✌️ PrismaClient injected into container');
	} catch (e) {
		LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
		throw e;
	}
};
