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
    this.route.get("/getEvent/:email", this.dashboardController.getEvent);
    this.route.get("/getAttendee/:email/:eventId", this.dashboardController.getAttendees);
    this.route.get("/getTransaction/:email", this.dashboardController.getTransaction);
    this.route.get("/getAttendeeStatistic/:range/:email", this.dashboardController.getRegistrationStatistics);
  }

  getRoute(): Router {
    return this.route;
  }
};