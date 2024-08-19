import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';

export class DashboardRouter {
  private route: Router;
  private dashboardController: DashboardController;

  constructor() {
    this.route = Router();
    this.dashboardController = new DashboardController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.get("/getEvent/:id", this.dashboardController.getEvent);
  }

  getRoute(): Router {
    return this.route;
  }
};