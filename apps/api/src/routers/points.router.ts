import { Router } from 'express';
import { PointsController } from '../controllers/points.controller';
import { verifyToken } from '../middleware/verifyToken';

export class PointsRouter {
  private route: Router;
  private pointsController: PointsController;

  constructor() {
    this.route = Router();
    this.pointsController = new PointsController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/redeemreferralcode", this.pointsController.redeemReferralCode);
  }

  getRoute(): Router {
    return this.route;
  }
};