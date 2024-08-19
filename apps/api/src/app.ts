import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { EventRouter } from './routers/event.router';
import { AuthRouter } from './routers/auth.router';
import { PointsRouter } from './routers/points.router';
import { DiscountRouter } from './routers/discount.router';
import { DashboardRouter } from './routers/dashboard.router';
import path from 'path';

const PORT = process.env.port;
console.log('port::', PORT);

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/assets', express.static(path.join(__dirname, '../public')));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const eventRouter = new EventRouter();
    this.app.use('/api/event', eventRouter.getRoute());

    const authRouter = new AuthRouter();
    this.app.use('/api/auth', authRouter.getRoute());

    const pointsRouter = new PointsRouter();
    this.app.use('/api/points', pointsRouter.getRoute());

    const discountRouter = new DiscountRouter();
    this.app.use('/api/discount', discountRouter.getRoute());
    
    const dashboardRouter = new DashboardRouter();
    this.app.use('/api/dashboard', dashboardRouter.getRoute());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
