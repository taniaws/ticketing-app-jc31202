import { PromoController } from "../controllers/promo.controller";
import { Router } from "express";
export class promoRouter{
    private route:Router;
    private PromoController:PromoController;
    constructor(){
        this.PromoController=new PromoController();
        this.route = Router();
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.route.post('/create', this.PromoController.createPromo); 
      }
      getRoute(): Router {
        return this.route;
      }
}