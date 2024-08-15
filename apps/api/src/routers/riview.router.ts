import { feedbackController } from '../controllers/riview.controller';
import { Router } from 'express';

export class EventRouter {
  private route: Router;
  private feedbackController: feedbackController;

  constructor() {
    this.feedbackController = new feedbackController();
    this.route = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post('/create', this.feedbackController.feedbackCreate);
  }

  getRoute(): Router {
    return this.route;
  }
}
