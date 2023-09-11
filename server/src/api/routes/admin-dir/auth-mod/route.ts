// EXPRESS
import { Router } from 'express';
// DEPENDENCIES
import { celebrate, Joi } from 'celebrate';
import AuthController from './controller';

export default () => {
	const app = Router();

	app.post(
		'/request-token',
		celebrate({
			body: Joi.object({
				code: Joi.string().required(),
			}),
		}),
		AuthController.requestToken,
	);

	app.post(
		'/refresh-token',
		celebrate({
			body: Joi.object({
				code: Joi.string().required(),
			}),
		}),
		AuthController.refreshToken,
	);

	return app;
};
