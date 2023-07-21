import { Router } from 'express';
import rest from './rest-ops';
import soap from './soap-ops';

export default (): Router => {
	const app = Router();

	app.use('/rest', rest());
	app.use('/soap', soap());

	return app;
};
