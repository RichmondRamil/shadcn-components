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
		'/request-token',
		celebrate({
			body: Joi.object({
				code: Joi.string().required(),
			}),
		}),
		authController.requestToken,
	);

	app.post(
		'/refresh-token',
		celebrate({
			body: Joi.object({
				code: Joi.string().required(),
			}),
		}),
		authController.refreshToken,
	);

	return app;
};
