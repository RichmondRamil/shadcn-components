// EXPRESS
import { Router, Request, Response, NextFunction } from 'express';
// DEPENDENCIES
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';

import AuthController from './controller';
import { error } from 'console';

export default () => {
	const app = Router();
	const authController = Container.get(AuthController);

	app.post(
		'/',
		celebrate({
			body: Joi.object({
				Retrieve: Joi.object(),
				Describe: Joi.string(),
				Update: Joi.object(),
			}),
		}),
		authController.dynamic,
	);

	return app;
};
