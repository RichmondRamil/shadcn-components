import { Router } from 'express';
import rest from './rest-dir';
import soap from './soap-dir';

export default (): Router => {
	const app = Router();

	app.use('/rest', rest());
	app.use('/soap', soap());

	return app;
};
