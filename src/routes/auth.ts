import {Application, Request, Response } from 'express';
import { AuthController } from '../controllers/auth';

export class AuthRoutes {
    private authController: AuthController = new AuthController();
    public route(app: Application) {
    
      app.post('/api/login', (req: Request, res: Response) => {
        this.authController.login(req, res);
      });

   }
}