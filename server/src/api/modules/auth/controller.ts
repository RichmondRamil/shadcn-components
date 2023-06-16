// EXPRESS
import { Router, Request, Response, NextFunction } from 'express';
// DEPENDENCIES
import { Container, Service } from 'typedi';
// SERVICES
import AuthService from './service';
// UTILS
import { errorHandler } from '@/shared/utils/handlers';

@Service()
export default class AuthController {
	public async signUp(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const authServiceInstance = Container.get(AuthService);
			const { user } = await authServiceInstance.SignUp(req.body);
			return res.status(201).json({ user, token });
		} catch (e) {
			errorHandler(e);
			return next(e);
		}
	}
}
