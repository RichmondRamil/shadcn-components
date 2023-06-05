import { Router } from 'express';
import admin from './admin';

export default () => {
  const app = Router();

  //load admin api routes
  app.use('/admin', admin());

  return app;
};
