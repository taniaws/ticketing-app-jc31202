import { Router } from 'express';
import { DiscountController } from '../controllers/discount.controller';

export class DiscountRouter {
  private route: Router;
  private discountController: DiscountController;

  constructor() {
    this.route = Router();
    this.discountController = new DiscountController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post("/createDiscount", this.discountController.createDiscount);
    this.route.get("/getDiscount/:email", this.discountController.getValidDiscount);
    this.route.patch("/deleteDiscount", this.discountController.markExpiredDiscountAsDeleted);
    this.route.post("/redeemDiscount", this.discountController.redeemDiscount);
  }

  getRoute(): Router {
    return this.route;
  }
};