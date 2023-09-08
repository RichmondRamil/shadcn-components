// EXPRESS
import { Router } from 'express';
// DEPENDENCIES
import { celebrate, Joi } from 'celebrate';

import AuthController from './controller';

export default () => {
	const app = Router();

	app.post(
		'/',
		celebrate({
			body: Joi.object({
				Retrieve: Joi.object(),
				Describe: Joi.string(),
				Update: Joi.object(),
			}),
		}),
		AuthController.dynamic,
	);

	return app;
};
