import { verifyToken } from '../middleware/verifyToken';
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
    this.route.post('/create', verifyToken, this.eventController.createEvent);
    this.route.patch('/update/:id', this.eventController.updateEvent);
    this.route.delete('/delete/:id', this.eventController.DeleteEvent);
    this.route.get('/get/:id', this.eventController.GetEvent);
  }

  getRoute(): Router {
    return this.route;
  }
}
