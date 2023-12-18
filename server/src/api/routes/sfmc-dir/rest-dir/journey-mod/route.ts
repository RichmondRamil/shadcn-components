// EXPRESS
import { Router } from 'express';
// DEPENDENCIES
import { celebrate, Joi } from 'celebrate';
import AuthController from './controller';

export default () => {
	const app = Router();

	app.get(
		'/journey',
		AuthController.GetRequestJourney,
	);

	return app;
};
