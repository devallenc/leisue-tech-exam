import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import { UserRoutes } from "../routes/user";
import { AuthRoutes } from "../routes/auth";

const MONGO_URL: string = 'mongodb+srv://admin:admin@cluster0.jhct8.mongodb.net/<dbname>?retryWrites=true&w=majority'
class App {
   public app: express.Application;
   private userRoutes: UserRoutes = new UserRoutes();
   private authRoutes: AuthRoutes = new AuthRoutes();

    constructor() {
      this.app = express();
      this.middlewares();
      this.mongoSetup();
      this.userRoutes.route(this.app);
      this.authRoutes.route(this.app);
    }

    private middlewares(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    protected mongoSetup(): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoose
                .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
                .then(res => resolve(console.log('Connected to MongoDB')))
                .catch(err => reject(err));
        });
    }
}
export default new App().app;