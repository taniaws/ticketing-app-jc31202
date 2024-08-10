import { EventController } from '../controllers/event.controller';
import { Router } from 'express';

export class EventRouter {
  private route: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.route = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post('/create', this.eventController.createEvent);
  }

  getRoute(): Router {
    return this.route;
  }
}
