import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/verifyToken';
import { regisValidation } from '../middleware/validator/regis';

export class AuthRouter {
  private route: Router;
  private authController: AuthController;

  constructor() {
    this.route = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/regis", regisValidation, this.authController.regis);
    this.route.post("/login", this.authController.login);
    this.route.get("/keepLogin", verifyToken, this.authController.keepLogin);
  }

  getRoute(): Router {
    return this.route;
  }
};