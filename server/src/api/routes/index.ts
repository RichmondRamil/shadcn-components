import admin from './admin-ops';
import sfmc from './sfmc-ops';
import { Router } from 'express';

export default (): Router => {
	const app = Router();

	//load admin api routes
	app.use('/test', (req, res) => {
		res.status(200).json({ message: 'Hey this is my API running 🥳' });
	});

	app.use('/admin', admin());
	app.use('/sfmc', sfmc());

	return app;
};
