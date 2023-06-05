import { Router } from 'express';
import auth from '../modules/auth/route';

export default (): Router => {
  const app = Router();

  app.use('/auth', auth());

  return app;
};
