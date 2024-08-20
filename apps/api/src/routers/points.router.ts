import { Router } from 'express';
import { PointsController } from '../controllers/points.controller';

export class PointsRouter {
  private route: Router;
  private pointsController: PointsController;

  constructor() {
    this.route = Router();
    this.pointsController = new PointsController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post('/redeemreferralcode', this.pointsController.redeemReferralCode);
    this.route.get('/getpoints/:email', this.pointsController.getValidPoints);
    this.route.patch('/deletepoints', this.pointsController.markExpiredPointsAsDeleted);
  }

  getRoute(): Router {
    return this.route;
  }
}
