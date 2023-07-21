import { Router } from 'express';

import dynamic from './dynamic-mod/route';
export default (): Router => {
	const app = Router();

	app.use('/dynamic', dynamic());

	return app;
};
