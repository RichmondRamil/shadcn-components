import express from 'express';
import cors from 'cors';
import routes from '@/api/routes';
import config from '@/config';
import helmet from 'helmet';
import { errorHandler } from '@/shared/utils/handlers';

export default ({ app }: { app: express.Application }): void => {
	/**
	 * Health Check endpoints
	 */
	app.get('/status', (req, res) => {
		res.status(200).json({ status: 'OK' });
	});

	// Helmet helps secure Express apps by setting HTTP response headers. It's not a silver bullet, but it can help!
	// https://helmetjs.github.io/
	app.use(helmet());

	// Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
	// It shows the real origin IP in the heroku or Cloudwatch logs
	app.enable('trust proxy');

	// The magic package that prevents frontend developers going nuts
	// Alternate description:
	// Enable Cross Origin Resource Sharing to all origins by default
	app.use(cors());

	// Transforms the raw string of req.body into json
	app.use(express.json({ limit: '5mb' }));

	// Load API routes
	app.use(config.api.prefix, routes());

	/// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err['status'] = 404;
		next(err);
	});

	/// Error handlers
	app.use((err, req, res, next) => {
		errorHandler(err);
		return res.status(err.status || 500).json({
			message: err.message,
			info: err,
		});
	});
};
