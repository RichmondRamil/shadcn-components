import { Router } from 'express';
import getJourney from './journey-mod/route';

export default (): Router => {
	const app = Router();

	app.use('/get', getJourney());

	return app;
};
