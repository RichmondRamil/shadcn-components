import { Router } from 'express';
import auth from './auth-mod/route';

export default (): Router => {
	const app = Router();

	app.use('/auth', auth());

	return app;
};
