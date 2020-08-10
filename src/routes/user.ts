import {Application, Request, Response } from 'express';
import { UserController } from '../controllers/users';
import { checkJwt } from '../helpers/jwt-check';

export class UserRoutes {
    private userController: UserController = new UserController();
    public route(app: Application) {
    
      app.get('/api', (req: Request, res: Response) => {
        this.userController.getUsers(req, res);
      });

      app.post('/api', (req: Request, res: Response) => {
        this.userController.createUser(req, res);
      });

      app.patch('/api/:id', (req: Request, res: Response) => {
        this.userController.updateUser(req, res);
      });

      app.delete('/api/:id', (req: Request, res: Response) => {
        this.userController.deleteUser(req, res);
      });
   }
}