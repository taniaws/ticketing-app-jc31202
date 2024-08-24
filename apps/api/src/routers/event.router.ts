import { verifyToken } from '../middleware/verifyToken';
import { EventController } from '../controllers/event.controller';
import { Router } from 'express';
import { uploader } from '../middleware/uploader';

export class EventRouter {
  private route: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.route = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post(
      '/create',
      verifyToken,
      uploader('/event', 'poster').single('imgEvent'),
      this.eventController.createEvent,
    );
    this.route.patch(
      '/update/:id',
      verifyToken,
      this.eventController.updateEvent,
    );
    this.route.delete('/delete/:id', this.eventController.DeleteEvent);
    this.route.get('/get/:id', this.eventController.GetEvent);
    this.route.get('/getAllEvent', this.eventController.GetAllEvent);
    this.route.get('/getallDetail/:id', this.eventController.getDetailEvent);
    this.route.get('/getcategori', this.eventController.GetDataCategori);
    this.route.post('/getdatabycategori', this.eventController.filterCategori);
    this.route.get('/getlocation', this.eventController.getDatalocation);
    this.route.post('/getdatabylocation', this.eventController.filterEvent);
    this.route.get('/getpagination', this.eventController.GetAll);
  }

  getRoute(): Router {
    return this.route;
  }
}
