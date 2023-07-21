// EXPRESS
import { Request, Response, NextFunction } from 'express';
// DEPENDENCIES
import { Container, Service } from 'typedi';
// SERVICES
import AuthService from './service';
// UTILS
import { errorHandler } from '../../../../../shared/utils/handlers';

@Service()
export default class AuthController {
	public async dynamic(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const token = req.header('token');

			const authServiceInstance = Container.get(AuthService);
			const result = await authServiceInstance.dynamic(req.body, token);
			return res.status(200).json(result);
		} catch (e) {
			errorHandler(e);
			return next(e);
		}
	}
}
