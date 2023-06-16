// EXPRESS
import { Router, Request, Response, NextFunction } from 'express';
// DEPENDENCIES
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';

import AuthController from './controller';

export default () => {
	const app = Router();
	const authController = Container.get(AuthController);

	app.post(
		'/signup',
		celebrate({
			body: Joi.object({
				name: Joi.string().required(),
				email: Joi.string().required(),
				password: Joi.string().required(),
			}),
		}),
		authController.signUp,
	);

	return app;
};
