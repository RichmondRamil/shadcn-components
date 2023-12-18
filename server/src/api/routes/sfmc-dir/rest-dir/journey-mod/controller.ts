// EXPRESS
import { Router, Request, Response, NextFunction } from 'express';
// SERVICES
import JourneyService from './service';
// UTILS
import { errorHandler } from '../../../../../shared/utils/handlers';

export default {
	GetRequestJourney,
};

async function GetRequestJourney(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
	try {
		const token = req.header('token');
		const page = req.header('page');
		const result = await JourneyService.getJourneyData(token, page);

		return res.status(201).json(result);
	} catch (e) {
		return next(e);
	}
}