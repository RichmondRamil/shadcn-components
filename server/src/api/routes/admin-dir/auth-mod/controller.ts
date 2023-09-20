// EXPRESS
import { Router, Request, Response, NextFunction } from 'express';
// SERVICES
import AuthService from './service';
// UTILS
import { errorHandler } from '../../../../shared/utils/handlers';

export default {
	requestToken,
	refreshToken,
};

async function requestToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
	try {
		const code = req.body.code;
		const { expiration, token } = await AuthService.requestToken(code);

		return res.status(201).json({ expiration, token });
	} catch (e) {
		return next(e);
	}
}

async function refreshToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
	try {
		const code = req.body.code;
		const { expiration, token } = await AuthService.refreshToken(code);

		return res.status(201).json({ expiration, token });
	} catch (e) {
		return next(e);
	}
}
