import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { uploader } from '../middleware/uploader';
import { TransaksiController } from '../controllers/transaksi.controller';

export class TransaksiRouter {
  private route: Router;
  private TransaksiController: TransaksiController;

  constructor() {
    this.TransaksiController = new TransaksiController();
    this.route = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.route.post(
      '/create',
      verifyToken,
      this.TransaksiController.createTransaksi,
    );
    this.route.post(
      '/PostTransaksi',
      verifyToken,
      this.TransaksiController.createTransaksi,
    );
    this.route.get(
      '/transaksidetail/:id',
      this.TransaksiController.getDetailTransaksi,
    );
  }
  getRoute(): Router {
    return this.route;
  }
}
