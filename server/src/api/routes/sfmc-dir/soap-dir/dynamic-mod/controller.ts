// EXPRESS
import { Request, Response, NextFunction } from 'express';
// SERVICES
import AuthService from './service';
// UTILS
import { errorHandler } from '../../../../../shared/utils/handlers';

export default {
	dynamic,
};

async function dynamic(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
	try {
		const token = req.header('token');

		const result = await AuthService.dynamic(req.body, token);
		return res.status(200).json(result);
	} catch (e) {
		return next(e);
	}
}
