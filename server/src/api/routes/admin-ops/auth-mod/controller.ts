// EXPRESS
import { Router, Request, Response, NextFunction } from 'express';
// DEPENDENCIES
import { Container, Service } from 'typedi';
// SERVICES
import AuthService from './service';
// UTILS
import { errorHandler } from '../../../../shared/utils/handlers';

@Service()
export default class AuthController {
	public async requestToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const authServiceInstance = Container.get(AuthService);

			const code = req.body.code;
			const { expiration, token } = await authServiceInstance.requestToken(code);

			return res.status(201).json({ expiration, token });
		} catch (e) {
			errorHandler(e);
			return next(e);
		}
	}

	public async refreshToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const authServiceInstance = Container.get(AuthService);

			const code = req.body.code;
			const { expiration, token } = await authServiceInstance.refreshToken(code);

			return res.status(201).json({ expiration, token });
		} catch (e) {
			errorHandler(e);
			return next(e);
		}
	}
}
